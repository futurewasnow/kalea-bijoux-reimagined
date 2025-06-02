
import { Button } from "@/components/ui/button";
import { Play, Star, Award, Truck } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-purple-50 to-amber-50"></div>
      
      {/* Floating crystals animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-rose-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-300 rounded-full animate-bounce opacity-50 animation-delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-amber-300 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-emerald-300 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust badges */}
        <div className="flex justify-center items-center space-x-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 text-rose-500 mr-1" />
            <span>Handcrafted</span>
          </div>
          <div className="flex items-center">
            <Truck className="w-4 h-4 text-green-500 mr-1" />
            <span>Free Shipping</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 bg-clip-text text-transparent">
            Colorful Crystal
          </span>
          <br />
          <span className="text-gray-800">Earrings That</span>
          <br />
          <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Speak Your Soul
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Handcrafted statement earrings featuring authentic crystals. 
          Each piece tells a story of artisan craftsmanship, vibrant energy, and timeless elegance.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <Button size="lg" className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Shop Crystal Earrings
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-full flex items-center">
            <Play className="w-5 h-5 mr-2" />
            Watch Our Story
          </Button>
        </div>

        {/* Special offers */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-2xl border border-rose-100 shadow-lg">
          <p className="text-lg font-semibold text-gray-800 mb-2">✨ Limited Time: Holiday Collection</p>
          <p className="text-gray-600">Free shipping on orders over $75 + complimentary gift wrapping</p>
          <Button variant="ghost" className="mt-3 text-rose-600 hover:text-rose-700 font-medium">
            Shop Holiday Specials →
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
