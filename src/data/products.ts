
import { Product, Category } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Recycled Cotton Tote Bag",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600&auto=format&fit=crop",
    description: "Handcrafted from 100% recycled cotton, this durable tote bag reduces plastic waste while featuring unique designs from local artists.",
    sustainabilityScore: 5,
    category: "fashion",
    certifications: [
      { name: "Global Organic Textile Standard" },
      { name: "Fair Trade Certified" }
    ],
    features: [
      "100% recycled cotton",
      "Plastic-free packaging",
      "Carbon-neutral shipping",
      "Supporting local artisans"
    ],
    inStock: true
  },
  {
    id: "2",
    name: "Bamboo Kitchen Utensil Set",
    price: 32.50,
    image: "https://images.unsplash.com/photo-1603199865111-9dc7e89c2fa6?q=80&w=600&auto=format&fit=crop",
    description: "This complete set of kitchen utensils is made from sustainable bamboo, a rapidly renewable resource that's naturally antibacterial.",
    sustainabilityScore: 4,
    category: "home",
    certifications: [
      { name: "FSC Certified" },
      { name: "Biodegradable" }
    ],
    features: [
      "Sustainably harvested bamboo",
      "No harmful chemicals",
      "Biodegradable",
      "Heat-resistant"
    ],
    inStock: true
  },
  {
    id: "3",
    name: "Reusable Silicone Food Storage Bags",
    price: 19.95,
    image: "https://images.unsplash.com/photo-1602532305019-3edda0449be7?q=80&w=600&auto=format&fit=crop",
    description: "Replace single-use plastic bags with these durable, leakproof silicone storage bags. Suitable for freezer, microwave, and dishwasher.",
    sustainabilityScore: 4,
    category: "home",
    certifications: [
      { name: "BPA-Free" },
      { name: "FDA Approved" }
    ],
    features: [
      "Replaces hundreds of plastic bags",
      "Dishwasher safe",
      "Freezer & microwave safe",
      "Hermetic seal"
    ],
    inStock: true
  },
  {
    id: "4",
    name: "Solar Powered Phone Charger",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
    description: "This portable solar charger harnesses renewable energy to power your devices anywhere. Compact design includes dual USB ports and LED light.",
    sustainabilityScore: 5,
    category: "tech",
    certifications: [
      { name: "Energy Star" },
      { name: "RoHS Compliant" }
    ],
    features: [
      "100% solar powered",
      "Dual USB charging",
      "Built-in LED flashlight",
      "Weather-resistant"
    ],
    inStock: true
  },
  {
    id: "5",
    name: "Organic Cotton Bedding Set",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop",
    description: "Sleep soundly on this luxurious bedding set made from 100% organic cotton, grown without harmful pesticides or chemicals.",
    sustainabilityScore: 5,
    category: "home",
    certifications: [
      { name: "GOTS Certified" },
      { name: "OEKO-TEX Standard 100" }
    ],
    features: [
      "100% organic cotton",
      "No harmful chemicals or dyes",
      "Hypoallergenic",
      "Breathable and soft"
    ],
    inStock: true
  },
  {
    id: "6",
    name: "Recycled Plastic Ocean Watch",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1679907301584-b99f1e97d371?q=80&w=600&auto=format&fit=crop",
    description: "This stylish timepiece features a case made from recycled ocean plastic and a strap from pineapple leaf fiber.",
    sustainabilityScore: 4,
    category: "fashion",
    certifications: [
      { name: "Plastic Negative Certified" },
      { name: "Vegan Society" }
    ],
    features: [
      "Recovered ocean plastic",
      "Plant-based strap",
      "Solar-powered movement",
      "Waterproof design"
    ],
    inStock: true
  }
];

export const categories: Category[] = [
  {
    id: "fashion",
    name: "Fashion & Apparel",
    icon: "👕"
  },
  {
    id: "home",
    name: "Home & Kitchen",
    icon: "🏠"
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    icon: "✨"
  },
  {
    id: "food",
    name: "Food & Beverages",
    icon: "🥗"
  },
  {
    id: "tech",
    name: "Sustainable Tech",
    icon: "🔋"
  }
];
