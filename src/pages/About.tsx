
import React from "react";
import Layout from "@/components/Layout";
import { ArrowUpRight, Heart, LeafyGreen, RecycleIcon, ShieldCheck, Users } from "lucide-react";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl text-muted-foreground">
            EcoBuy is dedicated to making sustainable living accessible and 
            affordable for everyone. We believe that small changes in how we shop 
            can lead to a significant positive impact on our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg mb-4">
              Founded in 2023, EcoBuy began with a simple question: why is it so 
              hard to find products that are truly sustainable?
            </p>
            <p className="text-lg mb-4">
              Our founder, after spending hours researching products only to be 
              disappointed by greenwashing and misleading claims, decided to create 
              a platform where every product is thoroughly vetted for its 
              environmental impact.
            </p>
            <p className="text-lg">
              Today, EcoBuy partners with over 100 sustainable brands worldwide, 
              each sharing our commitment to transparency and environmental 
              responsibility.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807?q=80&w=2000&auto=format&fit=crop" 
              alt="EcoBuy team working together" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-earth-50 rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <LeafyGreen className="h-12 w-12 text-eco-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
              <p className="text-muted-foreground">
                We carefully assess the environmental footprint of each product, 
                from raw materials to manufacturing process and end-of-life options.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ShieldCheck className="h-12 w-12 text-eco-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                We provide clear, honest information about each product's 
                sustainability credentials, allowing you to make informed choices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-eco-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                We believe in the power of collective action and foster a community 
                of environmentally conscious consumers and brands.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <RecycleIcon className="h-12 w-12 text-eco-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Circular Economy</h3>
              <p className="text-muted-foreground">
                We prioritize products designed for longevity, repairability, and 
                recyclability, reducing waste and resource consumption.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Heart className="h-12 w-12 text-eco-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Social Responsibility</h3>
              <p className="text-muted-foreground">
                We consider the social impact of products, including fair labor 
                practices and community benefits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ArrowUpRight className="h-12 w-12 text-eco-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
              <p className="text-muted-foreground">
                We're constantly evolving our standards and practices as new 
                sustainability research and technologies emerge.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <p className="text-lg mb-8">
            EcoBuy is powered by a passionate team of environmental scientists, 
            product experts, and tech innovators, all united by our commitment to 
            sustainability.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2000&auto=format&fit=crop" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Emma Chen</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Michael Torres</h3>
              <p className="text-muted-foreground">Head of Sustainability</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000&auto=format&fit=crop" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">Sarah Johnson</h3>
              <p className="text-muted-foreground">Product Director</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
