
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find the current category
  const category = categories.find(cat => cat.id === categoryId);

  // Mock fetch function - in a real app, this would call an API
  const fetchCategoryProducts = async (): Promise<Product[]> => {
    // For demo purposes, return filtered products from the imported data
    return new Promise((resolve) => {
      setTimeout(() => {
        // Normally this would be an API call filtering by category
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Bamboo Utensil Set",
            description: "Reusable bamboo utensils perfect for on-the-go meals. Includes fork, knife, spoon, and chopsticks in a compact carrying case.",
            price: 19.99,
            image: "https://images.unsplash.com/photo-1584346133934-7a7398d0c777?q=80&w=2000&auto=format&fit=crop",
            category: categoryId || "kitchen",
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
            category: categoryId || "accessories",
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
            category: categoryId || "home",
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
            category: categoryId || "tech",
            sustainabilityScore: 4.2,
            inStock: true,
            isOnSale: true
          }
        ];
        resolve(mockProducts);
      }, 500); // Simulate network delay
    });
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: fetchCategoryProducts,
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {category ? category.name : 'Category'} Products
          </h1>
          <p className="text-muted-foreground">
            Explore our selection of sustainable {category ? category.name.toLowerCase() : ''} products.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-[350px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
