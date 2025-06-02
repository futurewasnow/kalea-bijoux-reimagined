import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { ProductGrid } from '@/components/product/ProductGrid';
import { productService } from '@/lib/api/products';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Filter options type
type FilterOption = {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    count: number;
  }[];
};

// Sort options
const sortOptions = [
  { name: 'Most Popular', value: 'rating:desc' },
  { name: 'Best Rating', value: 'rating:desc' },
  { name: 'Newest', value: 'createdAt:desc' },
  { name: 'Price: Low to High', value: 'price:asc' },
  { name: 'Price: High to Low', value: 'price:desc' },
];

export function CollectionPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState<Record<string, boolean>>({});
  
  // Get filter values from URL
  const category = searchParams.get('category');
  const collection = searchParams.get('collection');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'rating:desc';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;

  // Mock filter options (in a real app, these would come from an API)
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'earrings', label: 'Earrings', count: 24 },
        { value: 'necklaces', label: 'Necklaces', count: 18 },
        { value: 'bracelets', label: 'Bracelets', count: 12 },
        { value: 'rings', label: 'Rings', count: 15 },
      ],
    },
    {
      id: 'material',
      name: 'Material',
      options: [
        { value: 'gold', label: 'Gold', count: 32 },
        { value: 'silver', label: 'Silver', count: 28 },
        { value: 'rose-gold', label: 'Rose Gold', count: 15 },
        { value: 'gemstone', label: 'Gemstone', count: 22 },
      ],
    },
    {
      id: 'stone',
      name: 'Stone',
      options: [
        { value: 'diamond', label: 'Diamond', count: 18 },
        { value: 'sapphire', label: 'Sapphire', count: 12 },
        { value: 'ruby', label: 'Ruby', count: 10 },
        { value: 'emerald', label: 'Emerald', count: 8 },
      ],
    },
    {
      id: 'price',
      name: 'Price',
      options: [
        { value: '0-50', label: 'Under $50', count: 15 },
        { value: '50-100', label: '$50 - $100', count: 28 },
        { value: '100-200', label: '$100 - $200', count: 35 },
        { value: '200-500', label: '$200 - $500', count: 22 },
        { value: '500-1000', label: '$500 - $1000', count: 12 },
        { value: '1000', label: 'Over $1000', count: 8 },
      ],
    },
  ]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, you would pass these filters to your API
        const { products: fetchedProducts, total } = await productService.getProducts({
          category: category || undefined,
          collection: collection || undefined,
          search: search || undefined,
          sort: sort || undefined,
          limit,
          // Add other filters as needed
        });
        
        setProducts(fetchedProducts);
        setTotalProducts(total);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, collection, search, sort, minPrice, maxPrice, page]);

  // Toggle filter section
  const toggleFilterSection = (filterId: string) => {
    setFiltersOpen(prev => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  // Update URL with new filter
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to first page when filters change
    params.delete('page');
    
    // Update URL
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
  };

  // Handle price range selection
  const handlePriceRangeSelect = (range: string) => {
    const [min, max] = range.split('-').map(Number);
    const params = new URLSearchParams(searchParams);
    
    if (!isNaN(min)) params.set('minPrice', min.toString());
    if (!isNaN(max)) params.set('maxPrice', max.toString());
    
    // Remove page from URL to reset to first page
    params.delete('page');
    
    // Update URL
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
  };

  // Clear all filters
  const clearAllFilters = () => {
    // Keep only the essential params
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (collection) params.set('collection', collection);
    if (search) params.set('search', search);
    
    // Update URL
    window.history.pushState({}, '', `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
  };

  // Check if any filters are active
  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key]) => !['category', 'collection', 'search', 'sort', 'page'].includes(key)
  );

  // Get active filter count
  const activeFilterCount = Array.from(searchParams.entries()).filter(
    ([key]) => !['category', 'collection', 'search', 'sort', 'page'].includes(key)
  ).length;

  // Get page title based on the current view
  const getPageTitle = () => {
    if (search) return `Search: "${search}"`;
    if (collection) return collection;
    if (category) return category;
    return 'All Products';
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <div className="fixed inset-0 z-40 lg:hidden">
          {mobileFiltersOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          )}

          <div
            className={`fixed inset-y-0 left-0 z-40 flex w-80 flex-col overflow-y-auto bg-white pb-12 shadow-xl transform transition-transform duration-300 ease-in-out ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 border-t border-gray-200 px-4 py-6">
              {filterOptions.map((section) => (
                <div key={section.id} className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500"
                      onClick={() => toggleFilterSection(section.id)}
                    >
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        {filtersOpen[section.id] ? (
                          <ChevronUp className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </h3>
                  <div className={`pt-6 ${filtersOpen[section.id] ? 'block' : 'hidden'}`}>
                    <div className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={searchParams.getAll(section.id).includes(option.value)}
                            className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                            onChange={(e) => {
                              if (section.id === 'price') {
                                handlePriceRangeSelect(option.value);
                              } else if (e.target.checked) {
                                updateFilter(section.id, option.value);
                              } else {
                                updateFilter(section.id, null);
                              }
                            }}
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label} ({option.count})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {hasActiveFilters && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {getPageTitle()}
            </h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    id="menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative ml-4">
                <label htmlFor="sort" className="sr-only">
                  Sort
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-rose-500 sm:text-sm sm:leading-6"
                  value={sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Desktop filters */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        className="text-sm font-medium text-rose-600 hover:text-rose-500"
                        onClick={clearAllFilters}
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {filterOptions.map((section) => (
                    <div key={section.id} className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                          onClick={() => toggleFilterSection(section.id)}
                        >
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            {filtersOpen[section.id] ? (
                              <ChevronUp className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <ChevronDown className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </button>
                      </h3>
                      <div className={`pt-6 ${filtersOpen[section.id] ? 'block' : 'hidden'}`}>
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={searchParams.getAll(section.id).includes(option.value)}
                                className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                                onChange={(e) => {
                                  if (section.id === 'price') {
                                    handlePriceRangeSelect(option.value);
                                  } else if (e.target.checked) {
                                    updateFilter(section.id, option.value);
                                  } else {
                                    updateFilter(section.id, null);
                                  }
                                }}
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label} <span className="text-gray-400">({option.count})</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {error ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-red-600 mb-2">Error loading products</h3>
                    <p className="text-gray-600">{error}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </div>
                ) : (
                  <>
                    <ProductGrid 
                      products={products} 
                      loading={loading} 
                      loadingCount={12}
                    />
                    
                    {/* Pagination */}
                    {totalProducts > limit && (
                      <nav
                        className="flex items-center justify-between border-t border-gray-200 px-4 py-6 sm:px-6 mt-12"
                        aria-label="Pagination"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                            <span className="font-medium">
                              {Math.min(page * limit, totalProducts)}
                            </span>{' '}
                            of <span className="font-medium">{totalProducts}</span> results
                          </p>
                        </div>
                        <div className="flex flex-1 justify-between sm:justify-end space-x-3">
                          <Button
                            variant="outline"
                            disabled={page <= 1}
                            onClick={() => {
                              const params = new URLSearchParams(searchParams);
                              params.set('page', (page - 1).toString());
                              window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
                              window.scrollTo(0, 0);
                            }}
                          >
                            Previous
                          </Button>
                          <Button
                            variant="outline"
                            disabled={page * limit >= totalProducts}
                            onClick={() => {
                              const params = new URLSearchParams(searchParams);
                              params.set('page', (page + 1).toString());
                              window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
                              window.scrollTo(0, 0);
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </nav>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
