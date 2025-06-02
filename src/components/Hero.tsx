
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">Vibrant</span>
                <span className="block bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Crystal Magic
                </span>
                <span className="block text-gray-900">for Bold Women</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Handcrafted crystal earrings that celebrate your unique spirit. Each piece tells a story of color, energy, and artisan craftsmanship.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-8 py-6 text-lg">
                Shop Collections
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-gray-300 px-8 py-6 text-lg hover:border-rose-300">
                Our Story
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Handmade with Love</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div className="aspect-square bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100 rounded-3xl p-8 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl shadow-inner flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-rose-200 to-purple-200 rounded-full flex items-center justify-center">
                      <div className="text-4xl">💎</div>
                    </div>
                    <p className="text-gray-600 font-medium">Featured Crystal Earrings</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
