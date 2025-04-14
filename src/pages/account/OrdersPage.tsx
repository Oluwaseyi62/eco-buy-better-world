
import React, { useState } from "react";
import Layout from "@/components/Layout";
import AccountLayout from "./AccountLayout";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const orders = user?.orders || [];
  
  // Filter orders based on search term and active tab
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm 
      ? order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
      
    const matchesTab = activeTab === "all" ? true : order.status === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <AccountLayout activeTab="orders">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">
              View and track your order history.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 border border-earth-200 rounded-lg">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet.</h2>
              <p className="text-muted-foreground mb-6">
                When you place orders, they will appear here.
              </p>
              <Button asChild className="bg-eco-600 hover:bg-eco-700">
                <a href="/shop">Start Shopping</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border border-earth-200 rounded-lg overflow-hidden">
                  {/* Order header */}
                  <div className="bg-earth-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Order {order.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Placed on {formatDate(order.date)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="font-semibold">${order.total.toFixed(2)}</div>
                      </div>
                      <Button variant="outline" size="sm" className="flex-shrink-0">
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Order items */}
                  <div className="p-4">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-right font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default OrdersPage;
