import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import GoogleSignupButton from "@/components/ui/GoogleSignupButton";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// Register form schema
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  
  // Check if user came from a protected route
  const from = location.state?.from || "/";
  
  // Set up forms with validation
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      acceptTerms: false
    }
  });
  
  useEffect(() => {
    // If user is already authenticated, redirect them
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //   const handleGoogle = async ()=> {
  //     const response = await fetch("http://localhost:3000/api/auth/google-login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  // body: JSON.stringify({ token: googleIdToken }),
  //      })
  //      const data = await response.json() 
  //      console.log('fromgoogel', data)
  //       if (response.ok) {
  //         toast({
  //           title: "Success",
  //           description: "You have successfully logged in with Google!",
  //           variant: "default",
  //         });
  //         navigate(from, { replace: true });
  //       } else {
  //         toast({
  //           title: "Error",
  //           description: data.message,
  //           variant: "destructive",
  //         });
  //       }
  //   }
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setLoginLoading(true);
    setLoginError(null);
    
    try {
      await login(values.email, values.password);
      // Success toast is handled in the AuthContext
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoginLoading(false);
    }
  };
  
  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    setRegisterLoading(true);
    setRegisterError(null);
    
    try {
      await registerUser(values.email, values.password, values.firstName, values.lastName);
      // Success toast is handled in the AuthContext
      navigate(from, { replace: true });
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : "Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a storage service
      // For demo purposes, we'll use a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        registerForm.setValue("firstName", registerForm.getValues("firstName")); // Trigger re-render
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome to EcoBuy</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account or create a new one
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  {loginError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                      {loginError}
                    </div>
                  )}
                
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="login-email">Email</FormLabel>
                        <FormControl>
                          <Input 
                            id="login-email" 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="login-password">Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              id="login-password"
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
                        <FormMessage />
                        <div className="text-xs text-muted-foreground mt-1">
                           Use the password you created during registration
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                        Remember me
                      </label>
                    </div>
                    <Link to="/auth/forgot-password" className="text-sm text-eco-600 hover:text-eco-700">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-eco-600 hover:bg-eco-700" 
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Logging in..." : "Log In"}
                  </Button>
                  
                  <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-earth-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-background px-2 text-muted-foreground">
                        OR
                      </span>
                    </div>
                  </div>
                  
                  <div className="">
                    {/* <Button variant="outline"  onClick={handleGoogle} className="w-full" type="button">
                      Google
                    </Button> */}
                   <GoogleLoginButton
                   text = {"signin_with"}
                   />
                   
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  {registerError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                      {registerError}
                    </div>
                  )}
                
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>
                          {registerForm.getValues("firstName") && registerForm.getValues("lastName") 
                            ? `${registerForm.getValues("firstName")[0]}${registerForm.getValues("lastName")[0]}` 
                            : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-eco-600 text-white flex items-center justify-center cursor-pointer"
                      >
                        <Upload className="h-4 w-4" />
                        <input 
                          id="avatar-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="register-first-name">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              id="register-first-name" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="register-last-name">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              id="register-last-name" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="register-email">Email</FormLabel>
                        <FormControl>
                          <Input 
                            id="register-email" 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="register-phone">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            id="register-phone" 
                            type="tel" 
                            placeholder="(555) 123-4567" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="register-password">Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              id="register-password"
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
                    control={registerForm.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-start">
                        <div className="flex items-center h-5">
                          <FormControl>
                            <input
                              id="terms"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                          I agree to the{" "}
                          <a href="#" className="text-eco-600 hover:text-eco-700">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-eco-600 hover:text-eco-700">
                            Privacy Policy
                          </a>
                        </label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit"  className="w-full bg-eco-600 hover:bg-eco-700" disabled={registerLoading}>
                    {registerLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                   <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-earth-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-background px-2 text-muted-foreground">
                        OR
                      </span>
                    </div>
                  </div>
                  <div className="">
                    {/* <Button variant="outline"  onClick={handleGoogle} className="w-full" type="button">
                      Google
                    </Button> */}
                   <GoogleSignupButton
                   text = {"signup_with"}
                   />
                   </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
     
    </div>
  );
};

export default LoginPage;
