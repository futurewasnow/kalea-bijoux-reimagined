
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";

export const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      name: "Rainbow Crystal Drops",
      price: "$89",
      originalPrice: "$120",
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 156,
      colors: ["rose", "purple", "blue", "emerald"],
      isNew: true,
      onSale: true
    },
    {
      id: 2,
      name: "Amethyst Dream Earrings",
      price: "$65",
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 5.0,
      reviews: 89,
      colors: ["purple", "violet"],
      isNew: false,
      onSale: false
    },
    {
      id: 3,
      name: "Rose Quartz Elegance",
      price: "$78",
      originalPrice: "$95",
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 203,
      colors: ["rose", "pink"],
      isNew: false,
      onSale: true
    },
    {
      id: 4,
      name: "Citrine Sunshine Drops",
      price: "$72",
      originalPrice: null,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 124,
      colors: ["yellow", "amber"],
      isNew: true,
      onSale: false
    }
  ];

  return (
    <section id="collections" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Featured Collections
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most beloved crystal earrings, handcrafted with authentic stones and designed to celebrate your unique energy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Product badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                {product.isNew && (
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">NEW</span>
                )}
                {product.onSale && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">SALE</span>
                )}
              </div>

              {/* Wishlist button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-rose-500" />
              </Button>

              {/* Product image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-purple-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Quick actions overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Button size="sm" className="bg-white text-gray-800 hover:bg-gray-100 rounded-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white rounded-full">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Product info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors">
                  {product.name}
                </h3>

                {/* Color options */}
                <div className="flex space-x-2 mb-4">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full border-2 border-gray-200 bg-${color}-300`}
                    ></div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-800">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <Button size="sm" variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-2 border-rose-500 text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg rounded-full">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};
