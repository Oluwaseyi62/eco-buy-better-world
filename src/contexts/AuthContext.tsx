
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  cart: CartItem[];
  orders: Order[];
  wishlist: WishlistItem[];
  verified?: boolean;
}

interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  verifyAccount: (email: string, code: string) => Promise<void>;
  resendVerificationCode: (email: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (item: Omit<WishlistItem, "inStock"> & { inStock?: boolean }) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
  createOrder: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [supabase] = useState<SupabaseClient>(() => 
    createClient(supabaseUrl, supabaseAnonKey)
  );

  // Initialize auth state from Supabase session
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Check if we have a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        // Check localStorage for cart/wishlist data for non-authenticated users
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            // Only use cart and wishlist from localStorage if user is not authenticated
            if (!parsedUser.id.startsWith('auth')) {
              setUser(parsedUser);
            }
          } catch (error) {
            console.error("Error parsing stored user:", error);
            localStorage.removeItem("user");
          }
        }
      }
      
      setIsLoading(false);
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            await fetchUserProfile(session.user);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            localStorage.removeItem("user");
          }
        }
      );
      
      // Cleanup subscription
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, [supabase]);

  // Fetch user profile from Supabase
  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user profile from profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          const newProfile = {
            id: supabaseUser.id,
            email: supabaseUser.email,
            first_name: '',
            last_name: '',
            cart: [],
            orders: [],
            wishlist: []
          };
          
          await supabase.from('profiles').insert(newProfile);
          
          const userObj: User = {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: '',
            cart: [],
            orders: [],
            wishlist: [],
            verified: supabaseUser.email_confirmed_at ? true : false
          };
          
          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
          return;
        }
      }
      
      // Get cart, orders, and wishlist
      const cart = profile?.cart || [];
      const orders = profile?.orders || [];
      const wishlist = profile?.wishlist || [];
      
      const userObj: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
        firstName: profile?.first_name,
        lastName: profile?.last_name,
        phone: profile?.phone,
        avatarUrl: profile?.avatar_url,
        cart,
        orders,
        wishlist,
        verified: supabaseUser.email_confirmed_at ? true : false
      };
      
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return Promise.resolve();
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      
      if (!email || !password || !firstName || !lastName) {
        return Promise.reject(new Error("Please fill in all fields"));
      }
      
      // Register user with Supabase Auth
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          },
          emailRedirectTo: `${window.location.origin}/auth/login`
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      });
      
      navigate(`/auth/verify?email=${encodeURIComponent(email)}`);
      
      return Promise.resolve();
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAccount = async (email: string, code: string) => {
    try {
      setIsLoading(true);
      
      if (!email || !code) {
        throw new Error("Email and verification code are required");
      }
      
      // Verify with Supabase
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'signup'
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Account Verified!",
        description: "Your account has been verified successfully. You can now log in to EcoBuy!",
      });
      
      navigate("/auth/login");
      
      return Promise.resolve();
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async (email: string) => {
    try {
      setIsLoading(true);
      
      if (!email) {
        throw new Error("Email is required");
      }
      
      // Resend verification email with Supabase
      const { error } = await supabase.auth.resend({
        email,
        type: 'signup',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Verification Code Sent",
        description: `We've sent a new verification code to ${email}. Please check your inbox.`,
      });
      
      return Promise.resolve();
    } catch (error: any) {
      toast({
        title: "Failed to resend code",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: ProfileUpdateData) => {
    try {
      setIsLoading(true);
      
      if (!user) {
        throw new Error("No user is logged in");
      }
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName || user.firstName,
          last_name: data.lastName || user.lastName,
          phone: data.phone || user.phone,
          avatar_url: data.avatarUrl || user.avatarUrl
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      const updatedUser = {
        ...user,
        ...data,
        name: `${data.firstName || user.firstName || ''} ${data.lastName || user.lastName || ''}`.trim(),
      };
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
      
      return Promise.resolve();
    } catch (error: any) {
      toast({
        title: "Failed to update profile",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  // Cart management functions
  const addToCart = async (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    if (!user) return;
    
    const quantity = item.quantity || 1;
    
    try {
      const existingItemIndex = user.cart.findIndex(cartItem => cartItem.id === item.id);
      
      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = [...user.cart];
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        updatedCart = [...user.cart, { ...item, quantity }];
      }
      
      const updatedUser = { ...user, cart: updatedCart };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ cart: updatedCart })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to add to cart",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) return;
    
    try {
      const updatedCart = user.cart.filter(item => item.id !== itemId);
      const updatedUser = { ...user, cart: updatedCart };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ cart: updatedCart })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error: any) {
      toast({
        title: "Failed to remove from cart",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const updateCartItemQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;
    
    if (quantity < 1) return;
    
    try {
      const updatedCart = user.cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      
      const updatedUser = { ...user, cart: updatedCart };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ cart: updatedCart })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error: any) {
      toast({
        title: "Failed to update cart",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, cart: [] };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ cart: [] })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error: any) {
      toast({
        title: "Failed to clear cart",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  // Wishlist management functions
  const addToWishlist = async (item: Omit<WishlistItem, "inStock"> & { inStock?: boolean }) => {
    if (!user) return;
    
    if (user.wishlist.some(wishlistItem => wishlistItem.id === item.id)) {
      toast({
        title: "Already in wishlist",
        description: `${item.name} is already in your wishlist`,
      });
      return;
    }
    
    try {
      const updatedWishlist = [...user.wishlist, { ...item, inStock: item.inStock ?? true }];
      const updatedUser = { ...user, wishlist: updatedWishlist };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ wishlist: updatedWishlist })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Added to wishlist",
        description: `${item.name} has been added to your wishlist`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to add to wishlist",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    if (!user) return;
    
    try {
      const updatedWishlist = user.wishlist.filter(item => item.id !== itemId);
      const updatedUser = { ...user, wishlist: updatedWishlist };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ wishlist: updatedWishlist })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error: any) {
      toast({
        title: "Failed to remove from wishlist",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const clearWishlist = async () => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, wishlist: [] };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ wishlist: [] })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error: any) {
      toast({
        title: "Failed to clear wishlist",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const createOrder = async (): Promise<string | null> => {
    if (!user || user.cart.length === 0) return null;
    
    try {
      const orderId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const orderDate = new Date().toISOString();
      
      const newOrder: Order = {
        id: orderId,
        date: orderDate,
        status: "processing",
        total: user.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        items: user.cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        }))
      };
      
      const updatedOrders = [...user.orders, newOrder];
      const updatedUser = { ...user, orders: updatedOrders, cart: [] };
      
      // If authenticated, update in Supabase
      if (user.id.startsWith('auth')) {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            orders: updatedOrders,
            cart: []
          })
          .eq('id', user.id);
          
        if (error) throw error;
        
        // You could also store orders in a separate table
        await supabase.from('orders').insert({
          id: orderId,
          user_id: user.id,
          order_date: orderDate,
          status: "processing",
          total: newOrder.total,
          items: newOrder.items
        });
      }
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Order placed!",
        description: `Your order #${orderId} has been placed successfully.`,
      });
      
      return orderId;
    } catch (error: any) {
      toast({
        title: "Failed to place order",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return null;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        verifyAccount,
        resendVerificationCode,
        logout,
        updateProfile,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        createOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
