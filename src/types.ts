export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  category: 'hair-pack' | 'cleanser' | 'scalp-care' | 'oil' | 'combos';
  badge?: string;
  isBestSeller?: boolean;
  stock: number;
  sizes: { weight: string; priceMultiplier: number }[];
  description: string;
  benefits: string[];
  ingredients: { name: string; botanical: string; benefit: string; percentage?: string }[];
  usageSteps: { step: number; title: string; desc: string }[];
  dosha: ('Vata' | 'Pitta' | 'Kapha' | 'Tridoshic')[];
  hairConcerns: string[];
  scentProfile: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  unitPrice: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatarUrl?: string;
  doshaType?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  hairConcerns?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'whatsapp' | 'cod' | 'online';
  status: 'Pending WhatsApp' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  notes?: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
  address?: string;
  city?: string;
  postalCode?: string;
  dosha?: string;
}

export type PageType = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'about' 
  | 'contact' 
  | 'checkout' 
  | 'order-success'
  | 'account'
  | 'auth'
  | 'admin-login' 
  | 'admin-dashboard';

export type AdminTab = 'orders' | 'products' | 'inventory' | 'analytics' | 'settings';

