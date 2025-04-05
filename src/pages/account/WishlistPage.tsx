
import React from "react";
import Layout from "@/components/Layout";
import AccountLayout from "./AccountLayout";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const WishlistPage: React.FC = () => {
  const { user, removeFromWishlist, clearWishlist, addToCart } = useAuth();
  const wishlistItems = user?.wishlist || [];

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.id);
  };

  return (
    <Layout>
      <AccountLayout activeTab="wishlist">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              Keep track of products you're interested in for future purchases.
            </p>
          </div>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 border border-earth-200 rounded-lg">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save items you're interested in by clicking the heart icon on product pages.
              </p>
              <Button asChild className="bg-eco-600 hover:bg-eco-700">
                <a href="/shop">Explore Products</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>{wishlistItems.length} items</div>
                <Button variant="outline" size="sm" onClick={clearWishlist}>
                  Remove All
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="border border-earth-200 rounded-lg overflow-hidden flex">
                    <div className="h-32 w-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <div className="text-lg font-semibold mb-1">${item.price.toFixed(2)}</div>
                        <div className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="text-muted-foreground"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                        <Button
                          size="sm"
                          disabled={!item.inStock}
                          className="bg-eco-600 hover:bg-eco-700 gap-1"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AccountLayout>
    </Layout>
  );
};

export default WishlistPage;
