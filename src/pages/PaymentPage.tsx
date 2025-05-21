
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, Truck, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { user, createOrder } = useAuth();
  const navigate = useNavigate();
  
  // Mock cart data for order summary
  const cartItems = user?.cart || [];
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const shipping = cartItems.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handlePayment = () => {
    // Create the order
    const orderId = createOrder();
    
    if (orderId) {
      toast({
        title: "Payment successful",
        description: `Order #${orderId} has been placed successfully.`,
      });
      navigate("/account/orders");
    } else {
      toast({
        title: "Payment failed",
        description: "Unable to process your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Payment Method</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg border border-earth-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
              
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border border-earth-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="card" id="payment-card" className="mr-3" />
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-eco-600" />
                      <Label htmlFor="payment-card" className="font-medium">
                        Credit / Debit Card
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border border-earth-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="transfer" id="payment-transfer" className="mr-3" />
                    <div className="flex items-center">
                      <Landmark className="h-5 w-5 mr-3 text-eco-600" />
                      <Label htmlFor="payment-transfer" className="font-medium">
                        Bank Transfer
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border border-earth-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="delivery" id="payment-delivery" className="mr-3" />
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 mr-3 text-eco-600" />
                      <Label htmlFor="payment-delivery" className="font-medium">
                        Pay on Delivery
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
              
              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiration">Expiration (MM/YY)</Label>
                      <Input id="expiration" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" className="mt-1" />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === "transfer" && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-earth-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Bank Transfer Details</h3>
                    <p className="text-sm text-muted-foreground">Please transfer the total amount to:</p>
                    <div className="mt-2">
                      <p><span className="font-medium">Bank:</span> EcoBank</p>
                      <p><span className="font-medium">Account Number:</span> 1234567890</p>
                      <p><span className="font-medium">Account Name:</span> EcoBuy Ltd</p>
                      <p><span className="font-medium">Reference:</span> Your email address</p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Your order will be processed once payment is confirmed.</p>
                  </div>
                </div>
              )}
              
              {paymentMethod === "delivery" && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-earth-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Pay on Delivery Information</h3>
                    <p className="text-sm text-muted-foreground">You can pay with cash or card when your order is delivered.</p>
                    <div className="flex items-center mt-3">
                      <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2" />
                      <span className="text-sm">Additional delivery fee may apply</span>
                    </div>
                  </div>
                </div>
              )}
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
              
              <Button className="w-full bg-eco-600 hover:bg-eco-700 mb-4" onClick={handlePayment}>
                Complete Payment
              </Button>
              
              <div className="text-center">
                <Link
                  to="/checkout"
                  className="text-sm text-muted-foreground hover:text-eco-600"
                >
                  Return to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
