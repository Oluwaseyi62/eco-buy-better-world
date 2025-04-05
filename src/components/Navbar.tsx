
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/data/products";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
  
  // Mock data - in a real app, these would come from context/state management
  const cartItemsCount = 2;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-eco-600 mr-2 text-2xl">🌿</span>
            <span className="text-xl font-bold text-eco-600">EcoBuy</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="ml-6 hidden md:flex">
              <Button variant="ghost" className="gap-1">
                Categories
                <span className="sr-only">Show categories</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {categories.map((category) => (
                <DropdownMenuItem key={category.id}>
                  <Link 
                    to={`/category/${category.id}`} 
                    className="flex w-full items-center"
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Responsive search bar */}
        {!isMobile && (
          <div className="hidden md:flex items-center md:w-1/3">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search sustainable products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-background px-4 py-2 pl-10 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>
          </div>
        )}

        {/* Mobile search overlay */}
        {isMobile && isSearchOpen && (
          <div className="absolute inset-0 bg-background/95 p-4 flex flex-col items-center animate-fade-in z-50">
            <div className="flex justify-between w-full mb-4">
              <span className="text-lg font-semibold">Search</span>
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search sustainable products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-background px-4 py-2 pl-10 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>
          </div>
        )}

        <div className="flex items-center space-x-1">
          {/* Search Button - visible only on mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* User Account Button */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-eco-100 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000&auto=format&fit=crop" />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Hello, {user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/orders" className="cursor-pointer">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account/wishlist" className="cursor-pointer">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-eco-100 transition-colors"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}

          {/* Shopping Cart Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-eco-100 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && isAuthenticated && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/cart" className="cursor-pointer">View Cart ({cartItemsCount})</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/checkout" className="cursor-pointer">Checkout</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-3 text-center">
                  <p className="text-sm mb-2">Please log in to view your cart</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-eco-600 hover:bg-eco-700"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-eco-100 transition-colors">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] md:w-[350px]">
              <div className="flex flex-col gap-4 mt-6">
                {isAuthenticated && (
                  <div className="flex items-center gap-3 p-3 bg-earth-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000&auto=format&fit=crop" />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                )}
                
                <h3 className="text-lg font-medium mb-2">Categories</h3>
                <div className="flex flex-col space-y-2">
                  {categories.map((category) => (
                    <Link 
                      key={category.id}
                      to={`/category/${category.id}`} 
                      className="flex items-center px-3 py-2 rounded-md hover:bg-accent"
                    >
                      <span className="mr-2 text-eco-600">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="border-t my-4"></div>
                
                {isAuthenticated ? (
                  <>
                    <Link to="/account/profile" className="px-3 py-2 rounded-md hover:bg-accent">My Account</Link>
                    <Link to="/account/orders" className="px-3 py-2 rounded-md hover:bg-accent">Orders</Link>
                    <Link to="/account/wishlist" className="px-3 py-2 rounded-md hover:bg-accent">Wishlist</Link>
                    <button 
                      onClick={logout}
                      className="flex items-center px-3 py-2 rounded-md hover:bg-accent text-red-500 text-left"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/auth/login" className="px-3 py-2 rounded-md hover:bg-accent">Login / Register</Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
