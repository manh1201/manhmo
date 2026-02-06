// Types for Premium Account Store

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
  isNewUser: boolean;
  discountUsed: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  discount: number;
  finalTotal: number;
}

export type View = 'home' | 'login' | 'register' | 'cart' | 'checkout' | 'admin' | 'products';

export const ADMIN_EMAIL = 'banducmanh2010@gmail.com';
export const ADMIN_PASSWORD = 'banducmanh1212010';
export const NEW_USER_DISCOUNT = 0.30; // 30% discount
