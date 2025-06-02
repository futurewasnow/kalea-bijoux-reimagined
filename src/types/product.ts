export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock: number;
  sku: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  isTaxable: boolean;
  isInStock: boolean;
  isGiftCard: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  requiresShipping: boolean;
  weight?: number;
  weightUnit: 'g' | 'kg' | 'oz' | 'lb';
  status: 'active' | 'draft' | 'archived';
  tags: string[];
  materials: string[];
  categories: string[];
  collections: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  featuredImage: string;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Omit<Product, 'variants' | 'images' | 'categories' | 'collections'> {
  quantity: number;
  variant?: {
    id: string;
    name: string;
    value: string;
    price?: number;
  };
  image: string;
}
