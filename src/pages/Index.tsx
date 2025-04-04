
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { Leaf, ShieldCheck, Truck, Recycle } from "lucide-react";

const Index: React.FC = () => {
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const communityRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    // Observer for feature cards
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setTimeout(() => {
                ref.classList.add('opacity-100', 'translate-y-0');
                ref.classList.remove('opacity-0', 'translate-y-10');
              }, index * 150);
            }
          },
          { threshold: 0.1 }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });
    
    // Observer for community section
    if (communityRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            communityRef.current?.classList.add('opacity-100', 'translate-x-0');
            communityRef.current?.classList.remove('opacity-0', 'translate-x-20');
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(communityRef.current);
      observers.push(observer);
    }
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-eco-600" />,
      title: "Verified Eco-Friendly",
      description:
        "Every product is thoroughly vetted for sustainability and ethical practices.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-eco-600" />,
      title: "Sustainability Score",
      description:
        "Our transparent rating system helps you make informed choices.",
    },
    {
      icon: <Truck className="h-10 w-10 text-eco-600" />,
      title: "Carbon-Neutral Shipping",
      description:
        "We offset the carbon footprint of every delivery.",
    },
    {
      icon: <Recycle className="h-10 w-10 text-eco-600" />,
      title: "Circular Economy",
      description:
        "Return used products for recycling and earn rewards.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 bg-earth-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">
                Why Shop with EcoBuy?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
                We're building a marketplace that makes sustainable shopping accessible, 
                affordable, and transparent for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  ref={(el) => (featureRefs.current[index] = el)}
                  className="rounded-xl bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-md opacity-0 translate-y-10 transform"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-eco-100 transition-all duration-300 hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        <section className="bg-eco-600 py-16 text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div 
                ref={communityRef}
                className="transition-all duration-1000 ease-out transform opacity-0 translate-x-20"
              >
                <h2 className="text-3xl font-bold mb-4">
                  Join Our Sustainable Community
                </h2>
                <p className="mb-6 text-eco-50">
                  Every purchase on EcoBuy contributes to building a more sustainable future. 
                  Join thousands of conscious consumers making better choices for our planet.
                </p>
                <ul className="eco-leaf-bullet space-y-3 mb-6">
                  <li className="text-eco-50 transition-all hover:translate-x-1 duration-300">Support eco-friendly businesses and artisans</li>
                  <li className="text-eco-50 transition-all hover:translate-x-1 duration-300">Reduce your carbon footprint with every purchase</li>
                  <li className="text-eco-50 transition-all hover:translate-x-1 duration-300">Earn rewards for sustainable choices</li>
                  <li className="text-eco-50 transition-all hover:translate-x-1 duration-300">Learn more about sustainable living</li>
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-[1.03] hover:rotate-1">
                <img 
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1000&auto=format&fit=crop" 
                  alt="Eco-friendly community" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
