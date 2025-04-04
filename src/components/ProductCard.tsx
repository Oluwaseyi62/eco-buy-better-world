
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import SustainabilityScore from "./SustainabilityScore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
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
        <Button className="w-full gap-2 bg-eco-600 hover:bg-eco-700 group">
          <ShoppingBag className="h-4 w-4" />
          <span className="sm:inline">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
