import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
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
  googleLogin: (token: string) => Promise<void>;
  googleSignUp: (token: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (
    item: Omit<WishlistItem, "inStock"> & { inStock?: boolean }
  ) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
  createOrder: () => string | null;
  verifyAccount: (email: string, code: string) => Promise<void>;
  resendVerificationCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (userId: string, newPassword: string) => Promise<void>;
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

      const response = await fetch(
        "https://ecobuy-server.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("errirData", errorData);
        throw new Error("Registration failed. Please try again.");
      }

      const data = await response.json();
      const newUser: User = {
        id: data.user.id,
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        cart: [],
        orders: [],
        wishlist: [],
      };

      const userForSession = { ...newUser };
      localStorage.setItem("user", JSON.stringify(userForSession));
      setUser(userForSession);

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      return Promise.resolve();
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (token: string) => {
    try {
      const res = await fetch(
        "https://ecobuy-server.onrender.com/api/auth/google-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        toast({
          title: "Google Login failed",
          description: data.error || "Google login failed.",
          variant: "destructive",
        });
        return Promise.reject(new Error(data.error || "Google login failed."));
      }
      const newUser: User = {
        id: data.user._id,
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        cart: [],
        orders: [],
        wishlist: [],
      };
      const userForSession = { ...newUser };
      localStorage.setItem("user", JSON.stringify(userForSession));
      setUser(userForSession);

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      return Promise.resolve();
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  const googleSignUp = async (token: string) => {
    try {
      const res = await fetch(
        "https://ecobuy-server.onrender.com/api/auth/google-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );
      const data = await res.json();

      if (!data.success) {
        toast({
          title: "Google Signup failed",
          description: data.error || "Google Signup failed.",
          variant: "destructive",
        });
        return Promise.reject(new Error(data.error || "Google login failed."));
      }
      const newUser: User = {
        id: data.user._id,
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        cart: [],
        orders: [],
        wishlist: [],
      };
      const userForSession = { ...newUser };
      localStorage.setItem("user", JSON.stringify(userForSession));
      setUser(userForSession);

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      return Promise.resolve();
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      // For demo purposes, we're using mock registration
      if (email && password && firstName && lastName) {
        // Check if user already exists
        const response = await fetch(
          "https://ecobuy-server.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              firstName,
              lastName,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();

          throw new Error(
            errorData.message || "Registration failed. Please try again."
          );
        }

        const data = await response.json();
        // Mock successful registration

        const newUser: User = {
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.firstName} ${data.user.lastName}`,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          cart: [],
          orders: [],
          wishlist: [],
        };

        // Log the user in
        const userForSession = { ...newUser };
        localStorage.setItem("user", JSON.stringify(userForSession));
        setUser(userForSession);

        toast({
          title: "Registration successful",
          description: "Welcome to EcoBuy!",
          variant: "default",
        });

        return Promise.resolve();
        // Optionally, save token or redirect
      } else {
        return Promise.reject(new Error("Please fill in all fields"));
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error instanceof Error ? error.message : "Please try again",
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
        name: `${data.firstName || user.firstName || ""} ${
          data.lastName || user.lastName || ""
        }`.trim(),
      };

      // Update in localStorage for the current session
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Also update in the "users" collection
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const updatedUsers = users.map((u: any) =>
          u.id === user.id ? { ...u, ...updatedUser } : u
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

  const addToCart = (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => {
    if (!user) return;

    const quantity = item.quantity || 1;

    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

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

    const updatedCart = user.cart.filter((item) => item.id !== itemId);
    const updatedUser = { ...user, cart: updatedCart };
    updateUserData(updatedUser);
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (!user) return;

    if (quantity < 1) return;

    const updatedCart = user.cart.map((item) =>
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

  const addToWishlist = (
    item: Omit<WishlistItem, "inStock"> & { inStock?: boolean }
  ) => {
    if (!user) return;

    // Check if item already exists in wishlist
    if (user.wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
      toast({
        title: "Already in wishlist",
        description: `${item.name} is already in your wishlist`,
      });
      return;
    }

    const updatedWishlist = [
      ...user.wishlist,
      { ...item, inStock: item.inStock ?? true },
    ];
    const updatedUser = { ...user, wishlist: updatedWishlist };
    updateUserData(updatedUser);

    toast({
      title: "Added to wishlist",
      description: `${item.name} has been added to your wishlist`,
    });
  };

  const removeFromWishlist = (itemId: string) => {
    if (!user) return;

    const updatedWishlist = user.wishlist.filter((item) => item.id !== itemId);
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

    const orderId = `ORD-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;
    const orderDate = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      date: orderDate,
      status: "processing",
      total: user.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      items: user.cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
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
        u.id === updatedUser.id ? { ...u, ...updatedUser } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const verifyAccount = async (email: string, code: string) => {
    try {
      setIsLoading(true);

      // Mock verification for demo purposes
      // In a real app, this would call an API endpoint

      if (code === "123456") {
        // Mock successful verification
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const userIndex = users.findIndex((u: any) => u.email === email);

          if (userIndex >= 0) {
            users[userIndex].emailVerified = true;
            localStorage.setItem("users", JSON.stringify(users));

            // If current user email matches, update their verified status
            if (user && user.email === email) {
              const updatedUser = { ...user, emailVerified: true };
              setUser(updatedUser);
              localStorage.setItem("user", JSON.stringify(updatedUser));
            }

            toast({
              title: "Email verified",
              description: "Your account has been successfully verified",
            });

            navigate("/");
          } else {
            throw new Error("User not found");
          }
        }
      } else {
        throw new Error("Invalid verification code");
      }

      return Promise.resolve();
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification failed",
        description:
          error instanceof Error
            ? error.message
            : "Please try again with a valid code",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async (email: string) => {
    try {
      // Mock resend verification code
      // In a real app, this would call an API endpoint to trigger another email

      toast({
        title: "Verification code sent",
        description: `A new verification code has been sent to ${email}`,
      });

      return Promise.resolve();
    } catch (error) {
      console.error("Resend verification code error:", error);
      toast({
        title: "Failed to resend code",
        description: "Please try again later",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);

      // Check if the email exists in the system
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const userExists = users.some((u: any) => u.email === email);

        if (!userExists) {
          throw new Error("No account found with this email address");
        }
      }

      // In a real app, this would call an API endpoint to send a reset email

      toast({
        title: "Reset link sent",
        description: `A password reset link has been sent to ${email}`,
      });

      return Promise.resolve();
    } catch (error) {
      console.error("Forgot password error:", error);
      toast({
        title: "Failed to send reset link",
        description:
          error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  //WE ARENT USING THEIS FUNCTION FOR REGISTER PASSWORD IT IS HANLDELD IN THE RESET PASSWORD PAGE
  const resetPassword = async (userId: string, newPassword: string) => {
    try {
      setIsLoading(true);

      // Mock password reset validation
      // In a real app, this would validate the code with an API

      if (!userId || !newPassword) {
        throw new Error("User ID and new password are required");
      }
      //We arent using this function in the resetPasword page
      const response = await fetch(
        "http://localhost:5000/api/user/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            password: newPassword,
          }),
        }
      );
      console.log("response", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData", errorData);
        toast({
          title: "Failed to reset password",
          description: "Please try again later",
          variant: "destructive",
        });

        toast({
          title: "Password reset successful",
          description: "You can now log in with your new password",
        });
        navigate("/auth/login");

        // throw new Error(
        //   errorData.message || "Failed to reset password. Please try again."
        // );
      }
      // Update password in mock storage

      return Promise.resolve();
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Failed to reset password",
        description:
          error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        googleLogin,
        googleSignUp,
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
        createOrder,
        verifyAccount,
        resendVerificationCode,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
