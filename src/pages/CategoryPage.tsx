
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find the current category
  const category = categories.find(cat => cat.id === categoryId);

  // Fetch products by category from our data
  const fetchCategoryProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter products by the current category
        const categoryProducts = products.filter(product => product.category === categoryId);
        resolve(categoryProducts);
      }, 300); // Small delay to simulate API call
    });
  };

  const { data: categoryProducts, isLoading } = useQuery({
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
        ) : categoryProducts && categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
