import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductVariantSelector } from '@/components/product/ProductVariantSelector';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { productService } from '@/lib/api/products';
import { Product, ProductVariant } from '@/types/product';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const productData = await productService.getProductBySlug(slug);
        
        if (!productData) {
          setError('Product not found');
          return;
        }
        
        setProduct(productData);
        
        // Set default variant (first available)
        if (productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);

  // Handle variant selection
  const handleVariantChange = (variantId: string) => {
    if (!product) return;
    
    const variant = product.variants.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(newQuantity, selectedVariant?.stock || 1)));
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    
    setIsAddingToCart(true);
    
    try {
      addItem({
        ...product,
        quantity,
        variant: {
          id: selectedVariant.id,
          name: selectedVariant.name,
          value: selectedVariant.value,
          price: selectedVariant.price,
        },
        image: product.images[0]?.url || '',
      });
      
      toast.success('Added to cart', {
        description: `${quantity} × ${product.name} (${selectedVariant.value})`,
        action: {
          label: 'View Cart',
          onClick: () => navigate('/cart'),
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Button>
      </div>
    );
  }

  // Calculate price (use variant price if available, otherwise use product price)
  const displayPrice = selectedVariant?.price || product.price;
  const displayCompareAtPrice = product.compareAtPrice && product.compareAtPrice > displayPrice 
    ? product.compareAtPrice 
    : null;

  // Check if selected variant is in stock
  const isInStock = selectedVariant ? selectedVariant.stock > 0 : product.isInStock;
  const maxQuantity = selectedVariant ? Math.min(selectedVariant.stock, 10) : 10;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-rose-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Gallery */}
          <div className="mb-8 lg:mb-0">
            <ProductGallery 
              images={product.images} 
              className="max-w-lg mx-auto"
            />
          </div>
          
          {/* Product Info */}
          <div className="max-w-lg mx-auto lg:max-w-none">
            <div className="mb-4">
              {product.collections && product.collections.length > 0 && (
                <span className="text-sm text-rose-600 font-medium">
                  {product.collections[0]}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(product.rating!)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>
            
            {/* Price */}
            <div className="mt-4">
              {displayCompareAtPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(displayPrice)}
                  </span>
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    {formatPrice(displayCompareAtPrice)}
                  </span>
                  <span className="ml-3 bg-rose-100 text-rose-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {Math.round(((displayCompareAtPrice - displayPrice) / displayCompareAtPrice) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(displayPrice)}
                </span>
              )}
              {product.isTaxable && (
                <p className="text-sm text-gray-500 mt-1">
                  Tax included. Shipping calculated at checkout.
                </p>
              )}
            </div>
            
            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mt-6">
                <ProductVariantSelector
                  variants={product.variants}
                  value={selectedVariant?.id}
                  onChange={handleVariantChange}
                  type="button"
                />
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="mt-8">
              <div className="flex items-center space-x-4
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex border border-gray-300 rounded-md w-32">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      max={maxQuantity}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= maxQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex-1 mt-6">
                  <Button
                    size="lg"
                    className="w-full py-6 text-base font-medium"
                    onClick={handleAddToCart}
                    disabled={!isInStock || isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : isInStock ? (
                      'Add to Cart'
                    ) : (
                      'Out of Stock'
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Free shipping</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">2-year warranty</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-sm text-gray-600">Secure payment</span>
                </div>
              </div>
              
              {/* Share and Wishlist */}
              <div className="mt-6 flex space-x-4
                <Button variant="outline" className="flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Product Tabs */}
            <div className="mt-12">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                  <div className="prose max-w-none text-gray-600">
                    <p>{product.description}</p>
                    {product.materials && product.materials.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900">Materials:</h4>
                        <ul className="list-disc pl-5 mt-2">
                          {product.materials.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-6">
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-900">Product Details</h4>
                      <dl className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm text-gray-500">SKU</dt>
                          <dd className="mt-1 text-sm text-gray-900">{product.sku}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Category</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {product.categories.join(', ')}
                          </dd>
                        </div>
                        {product.weight && (
                          <div>
                            <dt className="text-sm text-gray-500">Weight</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {product.weight} {product.weightUnit}
                            </dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-sm text-gray-500">Status</dt>
                          <dd className="mt-1 text-sm text-gray-900 capitalize">
                            {product.status}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="mt-6">
                  <div className="prose max-w-none text-gray-600">
                    <h4 className="font-medium text-gray-900">Shipping Information</h4>
                    <p className="mt-2">
                      We offer free standard shipping on all orders. Most orders are processed within 1-2 business days and delivered within 3-5 business days via standard shipping.
                    </p>
                    <h4 className="font-medium text-gray-900 mt-6">Returns & Exchanges</h4>
                    <p className="mt-2">
                      We accept returns within 30 days of purchase for a full refund. Items must be in their original condition with all tags attached. Please contact our customer service team to initiate a return.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
