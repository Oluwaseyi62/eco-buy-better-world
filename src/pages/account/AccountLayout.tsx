
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, User, Heart, Settings, LogOut } from "lucide-react";

interface AccountLayoutProps {
  children: React.ReactNode;
  activeTab: "profile" | "orders" | "wishlist" | "settings";
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, activeTab }) => {
  const location = useLocation();
  
  const tabs = [
    { id: "profile", label: "My Profile", icon: User, path: "/account/profile" },
    { id: "orders", label: "My Orders", icon: Package, path: "/account/orders" },
    { id: "wishlist", label: "My Wishlist", icon: Heart, path: "/account/wishlist" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-earth-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">My Account</h2>
            
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-eco-100 text-eco-700 font-medium"
                      : "text-muted-foreground hover:bg-earth-100 hover:text-eco-600"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </Link>
              ))}
              
              <div className="border-t border-earth-200 my-4"></div>
              
              <Link
                to="/account/settings"
                className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-earth-100 hover:text-eco-600 transition-colors"
              >
                <Settings className="h-5 w-5 mr-3" />
                Account Settings
              </Link>
              <Link
                to="/auth/login"
                className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-earth-100 hover:text-eco-600 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Log Out
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
