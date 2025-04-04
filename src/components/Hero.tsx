
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-earth-50 py-16 md:py-24">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-block rounded-full bg-eco-100 px-3 py-1 text-sm font-medium text-eco-800 mb-6">
              Shop Sustainably, Live Responsibly
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Your Marketplace for 
              <span className="text-eco-600"> Verified Eco-Friendly</span> Products
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Discover products that are good for you and the planet. 
              Every purchase helps build a more sustainable future.
            </p>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button className="bg-eco-600 hover:bg-eco-700 text-white pl-6 pr-4 py-6">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-eco-600 text-eco-600 hover:bg-eco-50 py-6">
                Learn About Our Mission
              </Button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-eco-200 opacity-50"></div>
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-earth-200 opacity-60"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop"
                alt="Sustainable products in natural setting"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
