export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  minStock: number;
  image?: string;
  emoji: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  lineDiscount?: number; // percentage, e.g. 10 for 10%
  customPrice?: number; // override price
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BusinessConfig {
  name: string;
  type: 'minimarket' | 'clothing' | 'hardware' | 'restaurant' | 'pharmacy';
  registers: number;
  hasScanner: boolean;
  hasElectronicInvoice: boolean;
}
