
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";
import SustainabilityScore from "./SustainabilityScore";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated, addToCart, addToWishlist, user } = useAuth();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  
  const isInWishlist = user?.wishlist?.some(item => item.id === product.id) || false;
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigation to product page
    
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      toast({
        title: "Authentication Required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth/login", { state: { from: `/product/${product.id}` } });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };
  
  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigation to product page
    
    if (!isAuthenticated) {
      // Redirect to login page with return URL
      toast({
        title: "Authentication Required",
        description: "Please log in to save items to your wishlist",
        variant: "destructive",
      });
      navigate("/auth/login", { state: { from: `/product/${product.id}` } });
      return;
    }
    
    if (!isInWishlist) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        inStock: product.inStock
      });
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {!isInWishlist && isHovering && (
        <button 
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
          onClick={handleToggleWishlist}
        >
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      )}
      {isInWishlist && (
        <button 
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-1.5 shadow-md"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
        </button>
      )}
      
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <SustainabilityScore score={product.sustainabilityScore} size="sm" />
          <span className="text-xs text-muted-foreground capitalize">
            {product.category}
          </span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="mb-1 line-clamp-1 font-medium hover:text-eco-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mb-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full gap-2 bg-eco-600 hover:bg-eco-700 group"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="sm:inline">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
