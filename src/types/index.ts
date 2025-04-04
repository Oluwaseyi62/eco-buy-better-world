
export type SustainabilityScore = 1 | 2 | 3 | 4 | 5;

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
  certifications: Certification[];
  features: string[];
  inStock: boolean;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};
