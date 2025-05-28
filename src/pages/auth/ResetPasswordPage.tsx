
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EyeIcon, EyeOffIcon, Lock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

const resetPasswordSchema = z.object({
 
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password")
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
   const { userId } = useParams<{ userId: string;  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword, isAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
     
      password: "",
      confirmPassword: "",
    },
  });
  
  // Extract UserId from query params
  useEffect(() => {
   
    
    if (!userId) {
      toast({
        title: "Error",
        description: "No email provided. Please try resetting your password again.",
        variant: "destructive",
      });
      navigate("/auth/forgot-password");
    } 
  }, [location, navigate]);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
console.log("ResetPasswordPage rendered with userId:", userId);
console.log(isSubmitting, "isSubmitting state");
  const onSubmit = async (data: ResetPasswordFormValues) => {
    console.log("Form submitted with data:", data);
    if (!userId) {
      toast({
        title: "Error",
        description: "No details provided. Please try resetting your password again.",
        variant: "destructive",
      });
      navigate("/auth/forgot-password");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Resetting password for userId:", userId, "with data:", data);
      // Handled the api call directly here not using the context
      // await resetPassword(userId, data.password);
      const response =    await fetch("https://ecobuy-server.onrender.com/api/user/update-password", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               userId,
               password: data.password,
             }),
           });
           if (!response.ok) {
              const errorData = await response.json();
              console.error("Error resetting password:", errorData);
              toast({
                title: "Failed to reset password",
                description: "Please try again later",
                variant: "destructive",
              });
              return;
           }
          if (response.ok) {
            toast({
              title: "Password reset successful",
              description: "You can now log in with your new password",
            });
            navigate("/auth/login");
          }
       
      
    
    } catch (error) {
      console.error("Password reset error:", error);
      // Error toast is handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-eco-50 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-eco-600" />
            </div>
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-muted-foreground mt-2">
             Input your password  and confirm the new password
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Must be at least 6 characters.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-eco-600 hover:bg-eco-700" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="text-sm"
              onClick={() => navigate("/auth/login")}
            >
              Back to login
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
