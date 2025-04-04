
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/data/products";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-eco-100 transition-colors">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/account/profile" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account/orders" className="cursor-pointer">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account/wishlist" className="cursor-pointer">Wishlist</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/auth/login" className="cursor-pointer">Login</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Shopping Cart Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-eco-100 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/cart" className="cursor-pointer">View Cart ({cartItemsCount})</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/checkout" className="cursor-pointer">Checkout</Link>
              </DropdownMenuItem>
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
                <Link to="/account/profile" className="px-3 py-2 rounded-md hover:bg-accent">My Account</Link>
                <Link to="/account/orders" className="px-3 py-2 rounded-md hover:bg-accent">Orders</Link>
                <Link to="/account/wishlist" className="px-3 py-2 rounded-md hover:bg-accent">Wishlist</Link>
                <Link to="/auth/login" className="px-3 py-2 rounded-md hover:bg-accent">Login</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
