
import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/products";

const Navbar: React.FC = () => {
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

        <div className="hidden md:flex items-center md:w-1/3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search sustainable products..."
              className="w-full rounded-full border border-border bg-background px-4 py-2 pl-10 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5 md:hidden" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
