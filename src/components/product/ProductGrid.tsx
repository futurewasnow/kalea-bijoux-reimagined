import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
  itemClassName?: string;
  loading?: boolean;
  loadingCount?: number;
}

export function ProductGrid({
  products,
  className,
  itemClassName,
  loading = false,
  loadingCount = 8,
}: ProductGridProps) {
  // Create skeleton loaders
  const skeletons = Array(loadingCount).fill(null);

  if (loading) {
    return (
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
        {skeletons.map((_, index) => (
          <div 
            key={`skeleton-${index}`} 
            className={cn('animate-pulse', itemClassName)}
          >
            <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
        <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
      {products.map((product) => (
        <div key={product.id} className={itemClassName}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
