import { GoogleLogin } from "@react-oauth/google";
import { toast } from "@/components/ui/use-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {  googleSignUp } = useAuth();
  // Check if user came from a protected route
  const from = location.state?.from || "/";
  const handleLoginSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    const token = credentialResponse.credential; // ✅ This is the Google ID Token
    
    try {
      await googleSignUp(token);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("SignUp error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-md">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      )}
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Signup Failed");
        }}
        type="standard"
        theme="outline"
        size="large"
        text={text}
        width="100%"
      />
    </div>
  );
}
