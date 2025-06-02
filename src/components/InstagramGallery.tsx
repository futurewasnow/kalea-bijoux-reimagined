
import { Button } from "@/components/ui/button";

const instagramPosts = [
  { id: 1, image: "💎", likes: "234", caption: "Loving these rainbow vibes! ✨" },
  { id: 2, image: "🌊", likes: "189", caption: "Ocean dreams in crystal form 💙" },
  { id: 3, image: "🌅", likes: "156", caption: "Sunset mood activated 🧡" },
  { id: 4, image: "🌿", likes: "203", caption: "Forest energy for the win! 💚" },
  { id: 5, image: "✨", likes: "278", caption: "Sparkling into the weekend! ✨" },
  { id: 6, image: "🔮", likes: "145", caption: "Crystal magic is real ✨" }
];

export const InstagramGallery = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-rose-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Share Your
            <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Crystal Story
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tag us @kaleabijoux to be featured! We love seeing how you style your crystal earrings.
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
            Follow @kaleabijoux
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-rose-100 to-purple-100 rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {post.image}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center">
                    <div className="text-lg font-bold">❤️ {post.likes}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
