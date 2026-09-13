export type StockStatus = "in-stock" | "low-stock" | "out-of-stock" | "backorder";

export interface QuantityTier {
  minQty: number;
  unitPriceExVat: number;
  savePct: number;
}

export interface ProductVariant {
  id: string;
  label: string;
  skuSuffix: string;
  priceIncVat: number;
  compareAtIncVat?: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  brand: string;
  name: string;
  categorySlug: string;
  categoryLabel: string;
  image: string;
  images: string[];
  priceIncVat: number;
  compareAtIncVat?: number;
  vatRate: number;
  tradePriceIncVat?: number;
  rating: number;
  reviewCount: number;
  stock: StockStatus;
  stockCount?: number;
  deliveryEta: string;
  badges?: string[];
  specs: { label: string; value: string }[];
  highlights: { icon: string; label: string; value: string; caption: string }[];
  variants?: ProductVariant[];
  quantityTiers?: QuantityTier[];
  description: string;
  whatsInTheBox: string[];
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  productCount: number;
  parentSlug?: string;
}

export interface CartLine {
  productId: string;
  variantId?: string;
  qty: number;
  savedForLater?: boolean;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  phone: string;
}

export type DeliveryMethodId = "standard" | "express" | "saturday" | "click-collect";

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  title: string;
  body: string;
  date: string;
  helpfulCount: number;
}
