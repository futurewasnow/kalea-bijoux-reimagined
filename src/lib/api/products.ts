import { Product, ProductVariant } from '@/types/product';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'KB-001',
    name: 'Rose Quartz Stud Earrings',
    slug: 'rose-quartz-stud-earrings',
    description: 'Beautiful rose quartz stud earrings that bring love and harmony. Handcrafted with genuine rose quartz stones set in 14k gold-plated sterling silver.',
    price: 45.00,
    compareAtPrice: 55.00,
    isTaxable: true,
    isInStock: true,
    isGiftCard: false,
    isFeatured: true,
    isNew: true,
    isOnSale: true,
    requiresShipping: true,
    weight: 5,
    weightUnit: 'g',
    status: 'active',
    tags: ['rose quartz', 'studs', 'earrings', 'healing crystals'],
    materials: ['Rose Quartz', '14k Gold Plated Sterling Silver'],
    categories: ['Earrings', 'Studs', 'Rose Quartz'],
    collections: ['New Arrivals', 'Best Sellers', 'Rose Quartz Collection'],
    variants: [
      { id: 'v1', name: 'Size', value: '6mm', price: 45.00, stock: 10, sku: 'KB-001-6MM' },
      { id: 'v2', name: 'Size', value: '8mm', price: 55.00, stock: 8, sku: 'KB-001-8MM' },
    ],
    images: [
      { id: 'img1', url: 'https://example.com/images/rose-quartz-1.jpg', alt: 'Rose Quartz Stud Earrings front view' },
      { id: 'img2', url: 'https://example.com/images/rose-quartz-2.jpg', alt: 'Rose Quartz Stud Earrings side view' },
      { id: 'img3', url: 'https://example.com/images/rose-quartz-3.jpg', alt: 'Rose Quartz Stud Earrings on display' },
    ],
    featuredImage: 'https://example.com/images/rose-quartz-1.jpg',
    rating: 4.8,
    reviewCount: 24,
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-05-20T14:45:00Z',
  },
  // Add more mock products as needed
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  // Get all products
  async getProducts(params?: {
    category?: string;
    collection?: string;
    search?: string;
    sort?: string;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }> {
    await delay(300); // Simulate network delay
    
    let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (params?.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.categories.some(cat => 
          cat.toLowerCase().includes(params.category!.toLowerCase())
        )
      );
    }
    
    if (params?.collection) {
      filteredProducts = filteredProducts.filter(product => 
        product.collections.some(collection => 
          collection.toLowerCase().includes(params.collection!.toLowerCase())
        )
      );
    }
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    if (params?.sort) {
      const [field, direction] = params.sort.split(':');
      filteredProducts.sort((a, b) => {
        // @ts-ignore
        const aValue = a[field as keyof Product];
        // @ts-ignore
        const bValue = b[field as keyof Product];
        
        if (aValue === undefined || bValue === undefined) return 0;
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        return direction === 'asc' 
          ? String(aValue).localeCompare(String(bValue)) 
          : String(bValue).localeCompare(String(aValue));
      });
    }
    
    // Apply limit
    const total = filteredProducts.length;
    if (params?.limit) {
      filteredProducts = filteredProducts.slice(0, params.limit);
    }
    
    return { products: filteredProducts, total };
  },
  
  // Get a single product by slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    await delay(200); // Simulate network delay
    const product = mockProducts.find(p => p.slug === slug);
    return product ? { ...product } : null;
  },
  
  // Get featured products
  async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    await delay(200);
    return mockProducts
      .filter(product => product.isFeatured)
      .slice(0, limit);
  },
  
  // Get related products
  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    await delay(200);
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return [];
    
    // Find products in the same categories
    return mockProducts
      .filter(p => 
        p.id !== productId && 
        p.categories.some(cat => product.categories.includes(cat))
      )
      .slice(0, limit);
  },
  
  // Get product variants
  async getProductVariants(productId: string): Promise<ProductVariant[]> {
    await delay(100);
    const product = mockProducts.find(p => p.id === productId);
    return product ? [...product.variants] : [];
  },
  
  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    await delay(300);
    const queryLower = query.toLowerCase();
    return mockProducts.filter(
      product =>
        product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(queryLower))
    );
  },
};
