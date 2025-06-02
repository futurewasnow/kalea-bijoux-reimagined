import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  showActions?: boolean;
}

export function ProductCard({ product, className, showActions = true }: ProductCardProps) {
  const { id, title, slug, images, price, compareAtPrice, isInStock, rating, reviewCount } = product;
  
  // Calculate discount percentage if there's a compare at price
  const discountPercentage = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className={cn('group relative', className)}>
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Link to={`/products/${slug}`} className="block h-full w-full">
          {images && images.length > 0 ? (
            <>
              <img
                src={images[0].url}
                alt={images[0].alt || title}
                className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-0"
              />
              {images.length > 1 && (
                <img
                  src={images[1].url}
                  alt={images[1].alt || title}
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity group-hover:opacity-100"
                />
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col space-y-2">
          {!isInStock && (
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              Out of Stock
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-rose-600 text-white">
              {discountPercentage}% OFF
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-blue-600 text-white">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-amber-600 text-white">Best Seller</Badge>
          )}
        </div>
        
        {/* Quick actions */}
        {showActions && (
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full transform flex-col items-center space-y-2 bg-white/90 p-4 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={!isInStock}
            >
              {isInStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <div className="flex w-full items-center justify-between">
              <button 
                type="button" 
                className="flex items-center text-sm font-medium text-gray-700 hover:text-rose-600"
                aria-label="Add to wishlist"
              >
                <Heart className="mr-1 h-4 w-4" />
                <span>Wishlist</span>
              </button>
              <button 
                type="button" 
                className="text-sm font-medium text-gray-700 hover:text-rose-600"
                aria-label="Quick view"
              >
                Quick View
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-rose-600">
              <Link to={`/products/${slug}`}>
                {title}
              </Link>
            </h3>
            {product.collections && product.collections.length > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                {product.collections[0].name}
              </p>
            )}
          </div>
          <button 
            type="button" 
            className="ml-2 text-gray-400 hover:text-rose-500"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        {/* Rating */}
        {rating && reviewCount ? (
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    rating > i ? 'text-yellow-400' : 'text-gray-200',
                    'h-4 w-4 flex-shrink-0 fill-current'
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        ) : (
          <div className="mt-1 h-5"></div> {/* Spacer for consistent layout */}
        )}
        
        {/* Price */}
        <div className="mt-2">
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-900">
              {formatPrice(price)}
            </p>
            {compareAtPrice && compareAtPrice > price && (
              <p className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(compareAtPrice)}
              </p>
            )}
          </div>
          {product.pricePerUnit && (
            <p className="text-xs text-gray-500">
              {product.pricePerUnit}
            </p>
          )}
        </div>
        
        {/* Color variants */}
        {product.variants && product.variants.some(v => v.name.toLowerCase() === 'color') && (
          <div className="mt-2 flex space-x-1">
            {product.variants
              .filter(v => v.name.toLowerCase() === 'color')
              .slice(0, 4)
              .map((variant) => (
                <div
                  key={variant.id}
                  className="h-4 w-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: variant.value }}
                  title={variant.name}
                />
              ))}
            {product.variants.filter(v => v.name.toLowerCase() === 'color').length > 4 && (
              <span className="text-xs text-gray-500">
                +{product.variants.filter(v => v.name.toLowerCase() === 'color').length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
