import { GoogleLogin } from "@react-oauth/google";
import { toast } from "@/components/ui/use-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  cart: [];
  orders: [];
  wishlist: [];
}

export default function GoogleLoginButton() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // Check if user came from a protected route
  const from = location.state?.from || "/";
  const handleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential; // ✅ This is the Google ID Token

    try {
      const res = await fetch("http://localhost:3000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log("Login success", data);
      const newUser: User = {
        id: data.user.id,
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        cart: [],
        orders: [],
        wishlist: [],
        avatarUrl: data.user.profileUrl,
      };
      //logging the user in
      const userForSession = { ...newUser };
      localStorage.setItem("user", JSON.stringify(userForSession));
      setUser(userForSession);
      navigate(from, { replace: true });

      toast({
        title: "Registration successful",
        description: "Welcome to EcoBuy!",
        variant: "default",
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
}
