
import { Button } from "@/components/ui/button";

const collections = [
  {
    name: "Rainbow Dreams",
    description: "Vibrant multi-colored crystals that capture every hue of joy",
    image: "🌈",
    color: "from-red-400 to-purple-600"
  },
  {
    name: "Ocean Vibes",
    description: "Cool blues and teals inspired by ocean depths",
    image: "🌊",
    color: "from-blue-400 to-teal-600"
  },
  {
    name: "Sunset Glow",
    description: "Warm oranges and pinks like a perfect sunset",
    image: "🌅",
    color: "from-orange-400 to-pink-600"
  },
  {
    name: "Forest Mystique",
    description: "Deep greens and earth tones for natural beauty",
    image: "🌿",
    color: "from-green-400 to-emerald-600"
  }
];

export const FeaturedCollections = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Color Story
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each collection is thoughtfully curated to celebrate different moods, occasions, and expressions of your unique style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-6 transform transition-all duration-300 group-hover:scale-105">
                <div className={`aspect-square bg-gradient-to-br ${collection.color} p-8 shadow-lg`}>
                  <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-6xl">{collection.image}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                  {collection.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {collection.description}
                </p>
                <Button variant="ghost" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                  Explore Collection →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
