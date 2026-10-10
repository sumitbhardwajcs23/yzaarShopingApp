export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  color: string;
  colorHex?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  features: string[];
  fabricCare: string;
  category: string;
  subCategory?: string;
  tags: string[];
  basePrice: number;
  compareAtPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  subCategories: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  variantId: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierPartner?: string;
  createdAt: string;
  timeline: OrderTimelineEvent[];
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  freeShipping?: boolean;
  minOrderValue?: number;
  description: string;
}

export type AdminRole =
  | 'super_admin'
  | 'manager'
  | 'inventory_staff'
  | 'support_staff'
  | 'content_editor';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  action: string;
  entity: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  subject: string;
  category: 'order' | 'shipping' | 'returns' | 'sizing' | 'general';
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  messages: {
    id: string;
    sender: 'customer' | 'support';
    text: string;
    timestamp: string;
  }[];
}
