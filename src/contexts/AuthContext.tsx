
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
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // For demo purposes, we're using mock authentication
      if (email && password) {
        // Mock successful login
        // Check localStorage for existing user
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        const foundUser = users.find((u: any) => u.email === email);
        
        if (foundUser && password === "password") { // Simple password check for demo
          setUser(foundUser);
          localStorage.setItem("user", JSON.stringify(foundUser));
          
          toast({
            title: "Login successful",
            description: "Welcome back!",
            variant: "default",
          });
          
          return Promise.resolve();
        } else {
          return Promise.reject(new Error("Invalid credentials"));
        }
      } else {
        return Promise.reject(new Error("Invalid credentials"));
      }
    } catch (error) {
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

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // For demo purposes, we're using mock registration
      if (email && password && firstName && lastName) {
        // Check if user already exists
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        if (users.some((u: any) => u.email === email)) {
          return Promise.reject(new Error("User with this email already exists"));
        }
        
        // Mock successful registration
        const newUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          name: `${firstName} ${lastName}`,
          firstName,
          lastName,
          cart: [],
          orders: [],
          wishlist: []
        };
        
        // Save to "database"
        users.push({...newUser, password}); // In a real app, never store passwords in plain text
        localStorage.setItem("users", JSON.stringify(users));
        
        // Log the user in
        const userForSession = {...newUser};
        localStorage.setItem("user", JSON.stringify(userForSession));
        setUser(userForSession);
        
        toast({
          title: "Registration successful",
          description: "Welcome to EcoBuy!",
          variant: "default",
        });
        
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("Please fill in all fields"));
      }
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

  // Cart functions
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

  // Wishlist functions
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

  // Order functions
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

  // Helper function to update user data in state and local storage
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
