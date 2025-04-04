
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const FeaturedProducts: React.FC = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Featured Eco Products
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover our handpicked selection of sustainable products
            </p>
          </div>
          <Button 
            variant="link" 
            className="text-eco-600 hover:text-eco-700 font-medium flex items-center gap-1 p-0"
          >
            View All Products
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
