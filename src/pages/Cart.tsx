import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const Cart: React.FC = () => {
  const { user, updateCartItemQuantity, removeFromCart, clearCart } = useAuth();
  const navigate = useNavigate();
  
  const cartItems = user?.cart || [];
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(id, newQuantity);
  };
  
  const removeItem = (id: string) => {
    removeFromCart(id);
  };
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const shipping = cartItems.length > 0 ? 4.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="bg-eco-600 hover:bg-eco-700">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-earth-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-earth-50">
                    <tr>
                      <th className="text-left py-4 px-6">Product</th>
                      <th className="text-center py-4 px-2">Quantity</th>
                      <th className="text-right py-4 px-6">Price</th>
                      <th className="text-right py-4 px-6">Total</th>
                      <th className="text-right py-4 px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-earth-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border border-earth-200 text-muted-foreground hover:bg-earth-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-3">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border border-earth-200 text-muted-foreground hover:bg-earth-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
            
            <div>
              <div className="bg-earth-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 border-b border-earth-200 pb-4 mb-4">
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
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-eco-600 hover:bg-eco-700" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="mb-2">
                    We accept:
                  </p>
                  <div className="flex space-x-2">
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-lg border border-earth-200 p-6">
                <h3 className="font-semibold mb-3">Have a coupon?</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-l-md border border-r-0 border-input px-3 py-2 text-sm focus:outline-none"
                  />
                  <Button variant="secondary" className="rounded-l-none">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
