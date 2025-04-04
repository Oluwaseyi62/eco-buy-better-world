
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-earth-50 py-16 md:py-24">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block rounded-full bg-eco-100 px-3 py-1 text-sm font-medium text-eco-800 mb-6 animate-bounce">
              Shop Sustainably, Live Responsibly
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl transition-all duration-700 delay-300 ease-out transform 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
              Your Marketplace for 
              <span className="text-eco-600 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:bottom-0 after:left-0 after:bg-eco-600 after:origin-bottom-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-bottom-left"> Verified Eco-Friendly</span> Products
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl transition-all duration-700 delay-500 ease-out transform 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
              Discover products that are good for you and the planet. 
              Every purchase helps build a more sustainable future.
            </p>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 transition-all duration-700 delay-700 ease-out transform 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}">
              <Button className="bg-eco-600 hover:bg-eco-700 text-white pl-6 pr-4 py-6 hover:scale-105 transition-transform duration-300">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
              </Button>
              <Button variant="outline" className="border-eco-600 text-eco-600 hover:bg-eco-50 py-6 hover:scale-105 transition-transform duration-300">
                Learn About Our Mission
              </Button>
            </div>
          </div>
          
          <div className={`relative hidden md:block transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-eco-200 opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-earth-200 opacity-60 animate-pulse"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(8,_112,_84,_0.3)]">
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
