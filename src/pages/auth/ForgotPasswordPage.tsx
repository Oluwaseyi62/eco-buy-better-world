
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";
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

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { forgotPassword, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState("");
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    
    try {
      await forgotPassword(data.email);
      setEmailSent(true);
      setSentToEmail(data.email);
    } catch (error) {
      console.error("Password reset request error:", error);
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
          {!emailSent ? (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 bg-eco-50 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-eco-600" />
                </div>
                <h1 className="text-2xl font-bold">Forgot Password?</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eco-600 hover:bg-eco-700" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="mx-auto w-12 h-12 bg-eco-50 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-eco-600" />
              </div>
              <h2 className="text-2xl font-bold">Check Your Email</h2>
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{sentToEmail}</strong>.
                Please check your inbox and follow the instructions to reset your password.
              </p>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email?
                </p>
                <Button
                  variant="link"
                  className="text-eco-600 p-0 h-auto font-normal"
                  type="button"
                  onClick={() => form.handleSubmit(onSubmit)()}
                >
                  Click here to resend
                </Button>
              </div>
            </div>
          )}
          
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

export default ForgotPasswordPage;
