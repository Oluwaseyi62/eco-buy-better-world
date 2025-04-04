
export type SustainabilityScore = number; // Using number instead of literal union type to allow decimal values

export interface Certification {
  name: string;
  logo?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sustainabilityScore: SustainabilityScore;
  category: string;
  certifications?: Certification[]; // Make it optional to fix errors
  features?: string[]; // Make it optional to fix errors
  inStock: boolean;
  isOnSale?: boolean; // Add isOnSale property
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};
