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
      
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      const foundUser = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && foundUser.password === password) {
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
      
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (users.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        return Promise.reject(new Error("User with this email already exists"));
      }
      
      const verificationCode = generateVerificationCode();
      
      const pendingVerifications = localStorage.getItem("pendingVerifications");
      const verifications = pendingVerifications ? JSON.parse(pendingVerifications) : [];
      
      const newVerification: VerificationData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        password,
        code: verificationCode,
        createdAt: Date.now()
      };
      
      verifications.push(newVerification);
      localStorage.setItem("pendingVerifications", JSON.stringify(verifications));
      
      sendVerificationEmail(email, verificationCode, firstName);
      
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
      
      if (verification.code !== code) {
        throw new Error("Invalid verification code");
      }
      
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
      
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push({...newUser, password: verification.password});
      localStorage.setItem("users", JSON.stringify(users));
      
      verifications.splice(verificationIndex, 1);
      localStorage.setItem("pendingVerifications", JSON.stringify(verifications));
      
      toast({
        title: "Account Verified!",
        description: "Your account has been verified successfully. You can now log in to EcoBuy!",
      });
      
      navigate("/auth/login");
      
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
      
      const newCode = generateVerificationCode();
      
      verifications[verificationIndex].code = newCode;
      verifications[verificationIndex].createdAt = Date.now();
      localStorage.setItem("pendingVerifications", JSON.stringify(verifications));
      
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
      
      const updatedUser = {
        ...user,
        ...data,
        name: `${data.firstName || user.firstName || ''} ${data.lastName || user.lastName || ''}`.trim(),
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((u: any) => 
          u.id === user.id ? {...u, ...updatedUser} : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      
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
    
    const existingItemIndex = user.cart.findIndex(cartItem => cartItem.id === item.id);
    
    let updatedCart;
    if (existingItemIndex >= 0) {
      updatedCart = [...user.cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
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
