
const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "These earrings are absolutely stunning! The colors are so vibrant and they make me feel confident and beautiful every time I wear them.",
    product: "Rainbow Dreams Collection"
  },
  {
    name: "Emma L.",
    rating: 5,
    text: "The quality is exceptional and the customer service is amazing. I've bought three pairs now and get compliments everywhere I go!",
    product: "Ocean Vibes Collection"
  },
  {
    name: "Jessica R.",
    rating: 5,
    text: "I love how each piece feels so unique and special. You can tell they're made with love and attention to detail.",
    product: "Sunset Glow Collection"
  }
];

export const CustomerReviews = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our
            <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of women who have found their perfect crystal earrings with Kalea Bijoux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div className="border-t border-white/50 pt-4">
                <div className="font-semibold text-gray-900">{review.name}</div>
                <div className="text-sm text-gray-600">{review.product}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
