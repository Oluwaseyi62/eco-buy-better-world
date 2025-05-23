
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

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  type: string;
  cardInfo?: {
    brand: string;
    last4: string;
  };
}

export interface OrderType {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress?: ShippingAddress;
  paymentMethod?: PaymentMethod;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};
