export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  sort?: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  color: string;
  color_hex: string;
  size: string;
  price: number;
  compare_at_price?: number;
  sort?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  short_description?: string;
  description?: string;
  material?: string;
  material_care?: string;
  shipping_returns?: string;
  moq: number;
  production_days: number;
  shipping_note?: string;
  featured?: boolean;
  rating?: number;
  review_count?: number;
  categories?: Category[];
  images?: string[];
  variants?: ProductVariant[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover?: string;
  published_at: string;
}

export interface SiteSettings {
  contact_email: string;
  phone: string;
  address: string;
  social_links: { platform: string; url: string }[];
  brand_description: string;
}

export interface HomeSection {
  hero_title: string;
  hero_subtitle: string;
  value_props: { icon: string; title: string; description: string }[];
}

export interface CartLineItem {
  productId: string;
  variantId: string;
  qty: number;
  snapshotPrice: number;
  productSlug: string;
  productTitle: string;
  variantLabel: string;
  image?: string;
  moq: number;
}

export interface OrderPayload {
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  notes?: string;
  locale: string;
  items: CartLineItem[];
}

export interface QuotePayload {
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  product_type: string;
  quantity: number;
  requirements: string;
  locale: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "production"
  | "shipped"
  | "completed"
  | "cancelled"
  | "paid";

export interface UserAccount {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
}
