
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { Mail, Clock } from "lucide-react";
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

const verificationSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits")
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

const VerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyAccount, resendVerificationCode, isAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });
  
  // Extract email from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    
    if (emailParam) {
      setEmail(emailParam);
    } else {
      toast({
        title: "Error",
        description: "No email provided. Please try registering again.",
        variant: "destructive",
      });
      navigate("/auth/login");
    }
  }, [location, navigate]);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
  // Handle cooldown for resend button
  useEffect(() => {
    if (cooldown <= 0) return;
    
    const timer = setTimeout(() => {
      setCooldown(cooldown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [cooldown]);
  
  const onSubmit = async (data: VerificationFormValues) => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email provided. Please try registering again.",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await verifyAccount(email, data.code);
      // Success toast is handled in the context
    } catch (error) {
      console.error("Verification error:", error);
      // Error toast is handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResendCode = async () => {
    if (cooldown > 0 || !email) return;
    
    try {
      await resendVerificationCode(email);
      setCooldown(60); // 60 second cooldown
    } catch (error) {
      console.error("Resend error:", error);
      // Error toast is handled in the context
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-eco-50 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-eco-600" />
            </div>
            <h1 className="text-2xl font-bold">Complete Your Registration</h1>
            <p className="text-muted-foreground mt-2">
              We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Enter the code below to verify your email and complete registration
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="mx-auto max-w-[320px]">
                    <FormLabel className="text-center block">Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                {isSubmitting ? "Verifying..." : "Complete Registration"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?
                </p>
                <Button
                  variant="link"
                  className="text-eco-600 p-0 h-auto font-normal"
                  type="button"
                  onClick={handleResendCode}
                  disabled={cooldown > 0}
                >
                  {cooldown > 0 ? (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Resend in {cooldown}s
                    </span>
                  ) : (
                    "Resend code"
                  )}
                </Button>
              </div>
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
      <Footer />
    </div>
  );
};

export default VerifyPage;
