
export const BrandStory = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Crafted with Love,
                <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                  Worn with Pride
                </span>
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Born from a passion for color and a belief that every woman deserves to feel radiant, 
                Kalea Bijoux began as a dream to bring joy through handcrafted crystal jewelry.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Each piece is carefully selected and artistically arranged to channel the natural 
                energy of crystals while celebrating the vibrant spectrum of your personality.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-rose-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Handmade</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-white via-rose-50 to-purple-100 rounded-3xl p-8 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl shadow-inner p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-200 to-purple-200 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">✨</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">The Kalea Touch</h3>
                    <p className="text-gray-600 text-sm">
                      Every crystal is chosen for its unique energy and beauty
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg">❤️</span>
                      </div>
                      <span className="text-xs text-gray-600">Love</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg">💎</span>
                      </div>
                      <span className="text-xs text-gray-600">Quality</span>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-lg">🌟</span>
                      </div>
                      <span className="text-xs text-gray-600">Magic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
