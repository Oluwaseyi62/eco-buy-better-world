import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Minus, 
  Plus, 
  Share2, 
  Star, 
  Truck, 
  ShieldCheck, 
  Recycle,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SustainabilityScore from "@/components/SustainabilityScore";
import { products as allProducts } from "@/data/products";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  
  // Fetch product from our data source
  const fetchProduct = async (): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundProduct = allProducts.find(p => p.id === productId);
        if (foundProduct) {
          resolve(foundProduct);
        } else {
          // If product not found in our data, use the mock product
          const mockProduct: Product = {
            id: productId || "1",
            name: "Bamboo Utensil Set",
            description: "Reusable bamboo utensils perfect for on-the-go meals. Includes fork, knife, spoon, and chopsticks in a compact carrying case. These utensils are made from sustainably harvested bamboo, a fast-growing renewable resource that doesn't require pesticides or fertilizers to grow.",
            price: 19.99,
            image: "https://images.unsplash.com/photo-1584346133934-7a7398d0c777?q=80&w=2000&auto=format&fit=crop",
            category: "kitchen",
            sustainabilityScore: 4.5,
            inStock: true,
            isOnSale: false
          };
          resolve(mockProduct);
        }
      }, 300);
    });
  };
  
  // Fetch related products based on category
  const fetchRelatedProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentProduct = allProducts.find(p => p.id === productId);
        if (currentProduct) {
          // Get products in the same category, excluding the current one
          const related = allProducts
            .filter(p => p.category === currentProduct.category && p.id !== productId)
            .slice(0, 4); // Limit to 4 related products
          
          resolve(related.length > 0 ? related : allProducts.slice(0, 3));
        } else {
          // Fallback to some default products
          resolve(allProducts.slice(0, 3));
        }
      }, 300);
    });
  };

  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: fetchProduct,
  });
  
  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery({
    queryKey: ['relatedProducts', productId],
    queryFn: fetchRelatedProducts,
  });
  
  const updateQuantity = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (isProductLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg bg-gray-100 animate-pulse h-[500px]"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-100 animate-pulse rounded w-2/3"></div>
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded w-full mt-6"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded w-full"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-eco-600 hover:bg-eco-700">
            <a href="/shop">Continue Shopping</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div>
            <div className="rounded-xl overflow-hidden border border-earth-200 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="rounded-md overflow-hidden border border-earth-200 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-md overflow-hidden border border-earth-200 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-md overflow-hidden border border-earth-200 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-md overflow-hidden border border-earth-200 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm text-muted-foreground capitalize">
                {product.category}
              </div>
              <div className="flex items-center">
                <button className="text-muted-foreground hover:text-eco-600 transition-colors mr-2">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="text-muted-foreground hover:text-eco-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.sustainabilityScore)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm">(24 reviews)</span>
              </div>
              <SustainabilityScore score={product.sustainabilityScore} />
            </div>
            
            <div className="text-2xl font-semibold mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <div className="text-sm font-semibold mb-2">Quantity</div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(-1)}
                  className="h-10 w-10 flex items-center justify-center rounded-l-md border border-earth-200 text-muted-foreground hover:bg-earth-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="h-10 w-16 flex items-center justify-center border-t border-b border-earth-200">
                  {quantity}
                </div>
                <button
                  onClick={() => updateQuantity(1)}
                  className="h-10 w-10 flex items-center justify-center rounded-r-md border border-earth-200 text-muted-foreground hover:bg-earth-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="flex-1 bg-eco-600 hover:bg-eco-700 gap-2">
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Feature bullets */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6 bg-earth-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-eco-600"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <div key={index} className="text-xs bg-earth-100 text-eco-800 px-3 py-1 rounded-full">
                      {cert.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-4 border-t border-earth-200 pt-6">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-eco-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Carbon-Neutral Shipping</div>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-eco-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Verified Sustainable</div>
                  <p className="text-sm text-muted-foreground">
                    We've checked this product's sustainability claims
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Recycle className="h-5 w-5 text-eco-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Send-Back Program</div>
                  <p className="text-sm text-muted-foreground">
                    Return when you're done for proper recycling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What's Included</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Bamboo fork (7.5 inches)</li>
                  <li>Bamboo knife (7.5 inches)</li>
                  <li>Bamboo spoon (7.5 inches)</li>
                  <li>Bamboo chopsticks (8 inches)</li>
                  <li>Cotton carrying case with drawstring</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Care Instructions</h3>
                <p className="text-muted-foreground">
                  Hand wash with mild soap and warm water. Dry thoroughly before storing. Oil occasionally with food-grade mineral oil to maintain finish. Not dishwasher safe. Not suitable for microwave use.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="sustainability" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Materials</h3>
                <p className="text-muted-foreground">
                  Made from 100% sustainably harvested bamboo, a fast-growing renewable resource that doesn't require pesticides or fertilizers to grow. The carrying case is made from organic cotton.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Production</h3>
                <p className="text-muted-foreground">
                  Handcrafted by skilled artisans in a fair-trade certified facility. The production process uses minimal water and energy. No harmful chemicals or dyes are used.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">End of Life</h3>
                <p className="text-muted-foreground">
                  The utensils are naturally biodegradable and compostable. When they've reached the end of their usable life, they can be composted or returned to us through our send-back program for proper disposal.
                </p>
              </div>
              <div className="bg-earth-50 p-4 rounded-lg flex items-start">
                <SustainabilityScore score={product.sustainabilityScore} size="lg" />
                <div className="ml-4">
                  <h3 className="font-semibold">Sustainability Score: {product.sustainabilityScore}/5</h3>
                  <p className="text-sm text-muted-foreground">
                    This product has earned an excellent sustainability rating due to its renewable materials, low-impact production, and end-of-life considerations.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-semibold">4.5/5</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(4.5)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Based on 24 reviews
                  </div>
                </div>
                <Button className="bg-eco-600 hover:bg-eco-700">
                  Write a Review
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="border-b border-earth-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">Sarah J.</div>
                    <div className="text-sm text-muted-foreground">2 weeks ago</div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 5
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    I love this utensil set! The bamboo is smooth and well-crafted, and the carrying case is perfect for keeping everything together. I use it for lunch at the office every day, and it's held up great so far.
                  </p>
                </div>
                
                <div className="border-b border-earth-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">Mike T.</div>
                    <div className="text-sm text-muted-foreground">1 month ago</div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Great product overall. The only slight issue is that the knife isn't super sharp, so it struggles with tougher foods. Otherwise, beautiful craftsmanship and I love that it's sustainable.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="outline" className="gap-2">
                  View All Reviews
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping</h3>
                <p className="text-muted-foreground">
                  We offer carbon-neutral shipping on all orders. Standard shipping (3-5 business days) is free on orders over $50. Express shipping (1-2 business days) is available for an additional fee.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Returns</h3>
                <p className="text-muted-foreground">
                  If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in their original packaging.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Send-Back Program</h3>
                <p className="text-muted-foreground">
                  When your product has reached the end of its usable life, you can send it back to us for proper recycling or composting. We'll even provide a shipping label. Contact customer service for details.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          
          {isRelatedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-[350px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
