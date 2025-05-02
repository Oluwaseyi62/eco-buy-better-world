
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Shop: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("featured");

  // Fetch all products from our data
  const fetchProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 300); // Small delay to simulate API call
    });
  };

  const { data: allProducts, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Filter and sort products
  const filteredProducts = allProducts?.filter(product => {
    // Filter by category
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort products
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "sustainability":
        return b.sustainabilityScore - a.sustainabilityScore;
      default: // featured
        return 0;
    }
  });

  // Calculate the maximum price for the slider
  const maxPrice = allProducts ? Math.ceil(Math.max(...allProducts.map(p => p.price))) : 100;

  // Set the initial price range to cover all products
  React.useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const min = Math.floor(Math.min(...allProducts.map(p => p.price)));
      const max = Math.ceil(Math.max(...allProducts.map(p => p.price)));
      setPriceRange([min, max]);
    }
  }, [allProducts]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">
            Browse our curated collection of sustainable and eco-friendly products.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-1/4 bg-earth-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  max={maxPrice}
                  step={1}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {filteredProducts?.length || 0} products
              </p>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="sustainability">Sustainability Score</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-[350px]"></div>
                ))}
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No products found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
