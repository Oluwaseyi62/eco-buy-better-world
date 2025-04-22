
import React from "react";
import Layout from "@/components/Layout";
import { Calendar, User, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Blog: React.FC = () => {
  // Mock blog posts data
  const featuredPost = {
    id: "1",
    title: "10 Simple Swaps for a More Sustainable Home",
    excerpt: "Small changes in your daily habits can make a big difference for the environment. Here are ten easy swaps to reduce your ecological footprint.",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=2000&auto=format&fit=crop",
    date: "April 2, 2025",
    author: "Emma Chen", 
    category: "Sustainable Living"
  };
  
  const blogPosts = [
    {
      id: "2",
      title: "Understanding Recycling Symbols: A Complete Guide",
      excerpt: "Confused by the various recycling symbols on packaging? We break down what each symbol means and how to recycle correctly.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2000&auto=format&fit=crop",
      date: "March 25, 2025",
      author: "Michael Torres",
      category: "Recycling"
    },
    {
      id: "3",
      title: "The Rise of Carbon-Neutral Products",
      excerpt: "As companies commit to reducing their carbon footprints, we're seeing more carbon-neutral products. But what does that really mean?",
      image: "https://images.unsplash.com/photo-1576931195369-0f211774d762?q=80&w=2000&auto=format&fit=crop",
      date: "March 18, 2025",
      author: "Sarah Johnson",
      category: "Climate Action"
    },
    {
      id: "4",
      title: "Sustainable Fashion: Beyond the Buzzwords",
      excerpt: "What makes clothing truly sustainable? We explore the complexities of ethical fashion and how to build an eco-friendly wardrobe.",
      image: "https://images.unsplash.com/photo-1576188973526-0e5765ef35ea?q=80&w=2000&auto=format&fit=crop",
      date: "March 10, 2025",
      author: "Lisa Wong",
      category: "Fashion"
    },
    {
      id: "5",
      title: "Zero-Waste Cooking: Tips from Professional Chefs",
      excerpt: "Learn how to reduce food waste and make the most of your ingredients with these professional tips for zero-waste cooking.",
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2000&auto=format&fit=crop",
      date: "March 3, 2025",
      author: "James Rodriguez",
      category: "Food & Kitchen"
    },
    {
      id: "6",
      title: "The Environmental Impact of Digital Products",
      excerpt: "Digital doesn't always mean green. We examine the surprising environmental footprint of our digital lives and how to reduce it.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
      date: "February 25, 2025",
      author: "David Kim",
      category: "Technology"
    }
  ];
  
  const categories = [
    "Sustainable Living",
    "Recycling",
    "Climate Action",
    "Fashion",
    "Food & Kitchen",
    "Technology",
    "Zero Waste",
    "Green Energy"
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">EcoBuy Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, tips, and stories about sustainable living and eco-friendly products.
          </p>
        </div>
        
        {/* Featured post */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm text-eco-600 font-medium mb-1">
                {featuredPost.category}
              </div>
              <h2 className="text-3xl font-bold mb-3">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <User className="h-4 w-4 mr-1" />
                <span className="mr-4">{featuredPost.author}</span>
                <Calendar className="h-4 w-4 mr-1" />
                <span>{featuredPost.date}</span>
              </div>
              <Button className="bg-eco-600 hover:bg-eco-700 w-fit">
                Read Article
              </Button>
            </div>
          </div>
        </div>
        
        {/* Search and categories */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Blog posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <div key={post.id} className="border border-earth-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-eco-600 font-medium mb-1">
                  {post.category}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <a href="#" className="flex items-center text-eco-600 font-medium hover:text-eco-700 transition-colors">
                  Read More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center">
          <nav className="flex items-center space-x-2">
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium"
            >
              1
            </a>
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              2
            </a>
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              3
            </a>
            <span className="inline-flex h-10 items-center justify-center">
              ...
            </span>
            <a
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              8
            </a>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
