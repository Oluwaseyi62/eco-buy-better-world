
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <div className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
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
                </div>
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
                  <a href="#" className="text-sm text-eco-600 hover:text-eco-700">
                    Forgot password?
                  </a>
                </div>
                <Button className="w-full bg-eco-600 hover:bg-eco-700">
                  Log In
                </Button>
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-earth-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="outline" className="w-full">
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    Facebook
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="register-first-name">First Name</Label>
                    <Input id="register-first-name" />
                  </div>
                  <div>
                    <Label htmlFor="register-last-name">Last Name</Label>
                    <Input id="register-last-name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
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
                    Must be at least 8 characters and include a number and a special character.
                  </p>
                </div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-eco-600 focus:ring-eco-500"
                  />
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
                </div>
                <Button className="w-full bg-eco-600 hover:bg-eco-700">
                  Create Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
