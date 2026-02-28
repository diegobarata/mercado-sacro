export interface ProductSpec {
  label: string;
  value: string;
}

export type ProductBadge = 'novo' | 'promoção' | 'mais vendido' | 'frete grátis';

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  categorySlug: string;
  images: string[];
  badge?: ProductBadge;
  specs: ProductSpec[];
  materials: string[];
  dimensions?: string;
  weight?: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  colors?: string[];
  sizes?: string[];
}
