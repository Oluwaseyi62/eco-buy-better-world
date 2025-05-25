import { GoogleLogin } from "@react-oauth/google";
import { toast } from "@/components/ui/use-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
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

export default function GoogleLoginButton({ text = "signin_with" }: { text?: "signin_with" | "signup_with" | "continue_with" | "signin" }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // Check if user came from a protected route
  const from = location.state?.from || "/";
  const handleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential; // ✅ This is the Google ID Token

    try {
      const res = await fetch("https://ecobuy-server.onrender.com/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      
      if (data.success){

      
     
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
    }else {
      if (data.nonRegistered) {
       toast({
        title: "Signing In Unsuccessful",
        description: "Please register an account first",
        variant: "destructive"
       })

      } else {
          toast({
        title: "Signing In Unsuccessful",
        description: "Please register an account first",
        variant: "destructive"
       })
      }
    }


    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    
 
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
         
        }}
        type="standard"
        theme="outline"
        size="large"
        text={text}
        width="100%"
        
      />
    
  );
}
