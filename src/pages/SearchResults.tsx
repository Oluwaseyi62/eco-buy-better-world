
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = React.useState(query);
  
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // Mock search function - in a real app, this would call an API
  const searchProducts = async (searchQuery: string): Promise<Product[]> => {
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
            description: "Charge your devices with the power of the sun. Compact, lightweight design with dual USB ports.",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop",
            category: "tech",
            sustainabilityScore: 4.9,
            inStock: true,
            isOnSale: false
          }
        ].filter(product => 
          searchQuery ? 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          : true
        );
        
        resolve(mockProducts);
      }, 500); // Simulate network delay
    });
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchProducts(query),
    enabled: !!query, // Only run the query if there's a search term
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for sustainable products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 h-12 text-base"
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1 bg-eco-600 hover:bg-eco-700 h-10"
            >
              Search
            </Button>
          </form>
          
          {query && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                Search Results for "{query}"
              </h1>
              <p className="text-muted-foreground">
                {products?.length || 0} products found
              </p>
            </div>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-[350px]"></div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any products matching "{query}". Try a different search term or browse our categories.
            </p>
            <Button asChild className="bg-eco-600 hover:bg-eco-700">
              <a href="/shop">Browse All Products</a>
            </Button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default SearchResults;
