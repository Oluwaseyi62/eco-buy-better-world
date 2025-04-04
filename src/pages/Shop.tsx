
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { categories } from "@/data/products";
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

  // Mock fetch function - in a real app, this would call an API
  const fetchProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Normally this would be an API call
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Bamboo Utensil Set",
            description: "Reusable bamboo utensils perfect for on-the-go meals. Includes fork, knife, spoon, and chopsticks in a compact carrying case.",
            price: 19.99,
            image: "https://images.unsplash.com/photo-1584346133934-7a7398d0c777?q=80&w=2000&auto=format&fit=crop",
            category: "kitchen",
            sustainabilityScore: 4.5,
            inStock: true,
            isOnSale: false
          },
          {
            id: "2",
            name: "Organic Cotton Tote Bag",
            description: "Durable, washable tote made from 100% organic cotton. Perfect for grocery shopping or daily use.",
            price: 14.99,
            image: "https://images.unsplash.com/photo-1619627261985-1ad98c30f15f?q=80&w=2000&auto=format&fit=crop",
            category: "accessories",
            sustainabilityScore: 5.0,
            inStock: true,
            isOnSale: true
          },
          {
            id: "3",
            name: "Recycled Glass Water Bottle",
            description: "Beautiful water bottle made from recycled glass with a silicone protective sleeve.",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1638184984605-af1f05249a56?q=80&w=2000&auto=format&fit=crop",
            category: "home",
            sustainabilityScore: 4.8,
            inStock: true,
            isOnSale: false
          },
          {
            id: "4",
            name: "Biodegradable Phone Case",
            description: "Protect your phone with this fully compostable phone case made from plant-based materials.",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=2000&auto=format&fit=crop",
            category: "tech",
            sustainabilityScore: 4.2,
            inStock: true,
            isOnSale: true
          },
          {
            id: "5",
            name: "Solar-Powered Charger",
            description: "Charge your devices using the power of the sun with this portable solar charger.",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop",
            category: "tech",
            sustainabilityScore: 4.7,
            inStock: true,
            isOnSale: false
          },
          {
            id: "6",
            name: "Beeswax Food Wraps",
            description: "Reusable, biodegradable alternative to plastic wrap. Perfect for keeping food fresh.",
            price: 18.99,
            image: "https://images.unsplash.com/photo-1606483956061-46a898dce538?q=80&w=2000&auto=format&fit=crop",
            category: "kitchen",
            sustainabilityScore: 4.9,
            inStock: true,
            isOnSale: true
          }
        ];
        resolve(mockProducts);
      }, 500); // Simulate network delay
    });
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Filter and sort products
  const filteredProducts = products?.filter(product => {
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
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
