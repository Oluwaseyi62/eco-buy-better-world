
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mock cart data for order summary
  const cartItems = user?.cart || [];
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const shipping = 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg border border-earth-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-eco-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                  1
                </div>
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none mt-1"
                  >
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="au">Australia</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" className="mt-1" />
                </div>
              </div>
            </div>
            
            {/* Shipping Method */}
            <div className="bg-white rounded-lg border border-earth-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-eco-600 text-white rounded-full flex items-center justify-center font-semibold mr-3">
                  2
                </div>
                <h2 className="text-xl font-semibold">Shipping Method</h2>
              </div>
              
              <RadioGroup defaultValue="standard" className="space-y-3">
                <div className="flex items-center justify-between border border-earth-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="standard" id="shipping-standard" className="mr-3" />
                    <div>
                      <Label htmlFor="shipping-standard" className="font-medium">
                        Standard Shipping
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Delivery in 3-5 business days
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold">$4.99</div>
                </div>
                <div className="flex items-center justify-between border border-earth-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="express" id="shipping-express" className="mr-3" />
                    <div>
                      <Label htmlFor="shipping-express" className="font-medium">
                        Express Shipping
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Delivery in 1-2 business days
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold">$9.99</div>
                </div>
              </RadioGroup>
              
              <div className="mt-4 flex items-start">
                <Truck className="h-5 w-5 text-eco-600 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  We offset the carbon emissions of all deliveries through our partnership with climate action organizations.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-earth-50 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t border-earth-200 pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-semibold text-lg mb-6 border-t border-earth-200 pt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Button className="w-full bg-eco-600 hover:bg-eco-700 mb-4" onClick={handleProceedToPayment}>
                Proceed to Payment
              </Button>
              
              <div className="text-center">
                <Link
                  to="/cart"
                  className="text-sm text-muted-foreground hover:text-eco-600"
                >
                  Return to Cart
                </Link>
              </div>
              
              <div className="mt-6 flex items-center justify-center space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <Truck className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
