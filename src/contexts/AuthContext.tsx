import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

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

interface VerificationData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  code: string;
  createdAt: number;
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

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we're using mock authentication
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Check localStorage for existing users
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && foundUser.password === password) { // Exact password check
        if (!foundUser.verified) {
          throw new Error("Please verify your email first");
        }
        
        const userForSession = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          phone: foundUser.phone,
          avatarUrl: foundUser.avatarUrl,
          cart: foundUser.cart || [],
          orders: foundUser.orders || [],
          wishlist: foundUser.wishlist || [],
          verified: foundUser.verified
        };
        
        setUser(userForSession);
        localStorage.setItem("user", JSON.stringify(userForSession));
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        return Promise.resolve();
      } else if (foundUser) {
        throw new Error("Incorrect password");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = (email: string, code: string, firstName: string): void => {
    console.log(`Sending verification code ${code} to ${email}`);
    // Simulating email sending
    toast({
      title: "Verification Code Sent",
      description: `We've sent a verification code to ${email}. Please check your inbox.`,
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      
      if (!email || !password || !firstName || !lastName) {
        return Promise.reject(new Error("Please fill in all fields"));
      }
      
      // Check if user already exists
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        return Promise.reject(new Error("User with this email already exists"));
      }
      
      // Generate verification code
      const verificationCode = generateVerificationCode();
      
      // Store pending verification
      const pendingVerifications = localStorage.getItem("pendingVerifications");
      const verifications = pendingVerifications ? JSON.parse(pendingVerifications) : [];
      
      // Add new verification request
      const newVerification: VerificationData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        password,
        code: verificationCode,
        createdAt: Date.now() // To track expiration in a real app
      };
      
      verifications.push(newVerification);
      localStorage.setItem("pendingVerifications", JSON.stringify(verifications));
      
      // Send verification email (simulated)
      sendVerificationEmail(email, verificationCode, firstName);
      
      // Navigate to verification page
      navigate(`/auth/verify?email=${encodeURIComponent(email)}`);
      
      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
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
      
      // Get pending verifications
      const pendingVerifications = localStorage.getItem("pendingVerifications");
      if (!pendingVerifications) {
        throw new Error("No pending verifications found");
      }
      
      const verifications = JSON.parse(pendingVerifications);
      const verificationIndex = verifications.findIndex(
        (v: VerificationData) => v.email.toLowerCase() === email.toLowerCase()
      );
      
      if (verificationIndex === -1) {
        throw new Error("No verification pending for this email");
      }
      
      const verification = verifications[verificationIndex];
      
      // In a real app, we might check if the code is expired here
      
      if (verification.code !== code) {
        throw new Error("Invalid verification code");
      }
      
      // Create the user account
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email: verification.email,
        name: `${verification.firstName} ${verification.lastName}`,
        firstName: verification.firstName,
        lastName: verification.lastName,
        cart: [],
        orders: [],
        wishlist: [],
        verified: true
      };
      
      // Save to "database"
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push({...newUser, password: verification.password});
      localStorage.setItem("users", JSON.stringify(users));
      
      // Remove from pending verifications
      verifications.splice(verificationIndex, 1);
      localStorage.setItem("pendingVerifications", JSON.stringify(verifications));
      
      // Log the user in
      const userForSession = {...newUser};
      localStorage.setItem("user", JSON.stringify(userForSession));
      setUser(userForSession);
      
      toast({
        title: "Account Verified!",
        description: "Your account has been verified successfully. Welcome to EcoBuy!",
      });
      
      navigate("/");
      
      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "Please try again",
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
      
      // Get pending verifications
      const pendingVerifications = localStorage.getItem("pendingVerifications");
      if (!pendingVerifications) {
        throw new Error("No pending verifications found");
      }
      
      const verifications = JSON.parse(pendingVerifications);
      const verificationIndex = verifications.findIndex(
        (v: VerificationData) => v.email.toLowerCase() === email.toLowerCase()
      );
      
      if (verificationIndex === -1) {
        throw new Error("No verification pending for this email");
      }
      
      // Generate new code
      const newCode = generateVerificationCode();
      
      // Update verification data
      verifications[verificationIndex].code = newCode;
      verifications[verificationIndex].createdAt = Date.now();
      localStorage.setItem("pendingVerifications", JSON.stringify(verifications));
      
      // Send new code
      sendVerificationEmail(
        email, 
        newCode, 
        verifications[verificationIndex].firstName
      );
      
      return Promise.resolve();
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: error instanceof Error ? error.message : "Please try again",
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
      
      // Update the user object with new data
      const updatedUser = {
        ...user,
        ...data,
        name: `${data.firstName || user.firstName || ''} ${data.lastName || user.lastName || ''}`.trim(),
      };
      
      // Update in localStorage for the current session
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Also update in the "users" collection
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((u: any) => 
          u.id === user.id ? {...u, ...updatedUser} : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      
      // Update state
      setUser(updatedUser);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    if (!user) return;
    
    const quantity = item.quantity || 1;
    
    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(cartItem => cartItem.id === item.id);
    
    let updatedCart;
    if (existingItemIndex >= 0) {
      // Increase quantity if item already in cart
      updatedCart = [...user.cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      updatedCart = [...user.cart, { ...item, quantity }];
    }
    
    const updatedUser = { ...user, cart: updatedCart };
    updateUserData(updatedUser);
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  const removeFromCart = (itemId: string) => {
    if (!user) return;
    
    const updatedCart = user.cart.filter(item => item.id !== itemId);
    const updatedUser = { ...user, cart: updatedCart };
    updateUserData(updatedUser);
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (!user) return;
    
    if (quantity < 1) return;
    
    const updatedCart = user.cart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    const updatedUser = { ...user, cart: updatedCart };
    updateUserData(updatedUser);
  };

  const clearCart = () => {
    if (!user) return;
    
    const updatedUser = { ...user, cart: [] };
    updateUserData(updatedUser);
  };

  const addToWishlist = (item: Omit<WishlistItem, "inStock"> & { inStock?: boolean }) => {
    if (!user) return;
    
    // Check if item already exists in wishlist
    if (user.wishlist.some(wishlistItem => wishlistItem.id === item.id)) {
      toast({
        title: "Already in wishlist",
        description: `${item.name} is already in your wishlist`,
      });
      return;
    }
    
    const updatedWishlist = [...user.wishlist, { ...item, inStock: item.inStock ?? true }];
    const updatedUser = { ...user, wishlist: updatedWishlist };
    updateUserData(updatedUser);
    
    toast({
      title: "Added to wishlist",
      description: `${item.name} has been added to your wishlist`,
    });
  };

  const removeFromWishlist = (itemId: string) => {
    if (!user) return;
    
    const updatedWishlist = user.wishlist.filter(item => item.id !== itemId);
    const updatedUser = { ...user, wishlist: updatedWishlist };
    updateUserData(updatedUser);
  };

  const clearWishlist = () => {
    if (!user) return;
    
    const updatedUser = { ...user, wishlist: [] };
    updateUserData(updatedUser);
  };

  const createOrder = (): string | null => {
    if (!user || user.cart.length === 0) return null;
    
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
    updateUserData(updatedUser);
    
    toast({
      title: "Order placed!",
      description: `Your order #${orderId} has been placed successfully.`,
    });
    
    return orderId;
  };

  const updateUserData = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // Also update in the "users" collection
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => 
        u.id === updatedUser.id ? {...u, ...updatedUser} : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
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
