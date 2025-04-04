
import React from "react";
import Layout from "@/components/Layout";
import { CheckCircle2, Info, LeafyGreen, Factory, Truck, Recycle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sustainability: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Sustainability Metrics</h1>
          <p className="text-xl text-muted-foreground">
            At EcoBuy, we believe in complete transparency. Here's how we evaluate the 
            environmental impact of each product in our marketplace.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Rating System</h2>
              <p className="text-lg mb-4">
                Every product on EcoBuy receives a sustainability score from 1 to 5, 
                with 5 being the most sustainable. This score is calculated based on a 
                comprehensive assessment across multiple criteria.
              </p>
              <p className="text-lg">
                We've partnered with environmental scientists and industry experts to 
                develop a rigorous evaluation framework that goes beyond superficial claims.
              </p>
            </div>
            <div className="bg-earth-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-eco-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                  5.0
                </div>
                <div>
                  <h3 className="font-semibold">Outstanding</h3>
                  <p className="text-sm text-muted-foreground">
                    Exceptional sustainability across all metrics
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-eco-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                  4.0
                </div>
                <div>
                  <h3 className="font-semibold">Excellent</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong performance with minor improvements possible
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-eco-400 flex items-center justify-center text-white font-bold text-xl mr-4">
                  3.0
                </div>
                <div>
                  <h3 className="font-semibold">Good</h3>
                  <p className="text-sm text-muted-foreground">
                    Solid sustainability practices with room for improvement
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-eco-300 flex items-center justify-center text-white font-bold text-xl mr-4">
                  2.0
                </div>
                <div>
                  <h3 className="font-semibold">Fair</h3>
                  <p className="text-sm text-muted-foreground">
                    Better than conventional alternatives
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-eco-200 flex items-center justify-center text-white font-bold text-xl mr-4">
                  1.0
                </div>
                <div>
                  <h3 className="font-semibold">Basic</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimum sustainability requirements met
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Evaluation Criteria</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-earth-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <LeafyGreen className="h-8 w-8 text-eco-600 mr-4" />
                <h3 className="text-xl font-semibold">Materials</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Renewable or recycled content</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Biodegradability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Toxicity and chemical content</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Resource efficiency</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-earth-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Factory className="h-8 w-8 text-eco-600 mr-4" />
                <h3 className="text-xl font-semibold">Production</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Energy efficiency</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Water usage and conservation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Waste management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Emissions and carbon footprint</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-earth-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-eco-600 mr-4" />
                <h3 className="text-xl font-semibold">Distribution</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Shipping distance and methods</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Packaging sustainability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Carbon offset programs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Warehouse energy efficiency</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border border-earth-200 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Recycle className="h-8 w-8 text-eco-600 mr-4" />
                <h3 className="text-xl font-semibold">End of Life</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Recyclability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Compostability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Take-back programs</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-eco-600 mr-2 flex-shrink-0" />
                  <span>Longevity and repairability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg border border-earth-200">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-6">
                How do you verify sustainability claims?
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground mb-2">
                  We use a multi-step verification process:
                </p>
                <ol className="list-decimal ml-6 space-y-1 text-muted-foreground">
                  <li>Review of certifications (FSC, GOTS, Fair Trade, etc.)</li>
                  <li>Documentation of materials and manufacturing processes</li>
                  <li>Third-party audits when available</li>
                  <li>Sample testing for certain product categories</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-6">
                Do you consider social sustainability?
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Yes, our evaluation includes working conditions, fair wages,
                  community impact, and other social factors. While our primary focus
                  is environmental sustainability, we believe social responsibility is
                  an essential component of holistic sustainability.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-6">
                How often do you update product ratings?
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  We review product ratings annually at minimum. However, we may update
                  ratings more frequently if there are significant changes to a product's
                  formulation, manufacturing process, or if new information becomes available.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-6">
                What's the minimum score needed to be listed on EcoBuy?
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="text-muted-foreground">
                  Products must score at least 3.0 in our rating system to be listed on
                  EcoBuy. This ensures that all products meet a minimum threshold of
                  sustainability, though we encourage brands to continuously improve their
                  scores.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="bg-eco-600 text-white p-8 rounded-xl">
          <div className="flex items-start mb-4">
            <Info className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
            <p className="text-lg">
              Our sustainability metrics are constantly evolving as research and technology 
              advance. We welcome feedback from customers, experts, and brands on how we can 
              improve our evaluation process.
            </p>
          </div>
          <div className="text-center mt-6">
            <a href="#" className="inline-block border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-eco-600 transition-colors">
              Download our complete sustainability report
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sustainability;
