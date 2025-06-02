
import { Hero } from "@/components/Hero";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { BrandStory } from "@/components/BrandStory";
import { CustomerReviews } from "@/components/CustomerReviews";
import { InstagramGallery } from "@/components/InstagramGallery";
import { Newsletter } from "@/components/Newsletter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      <Navigation />
      <Hero />
      <FeaturedCollections />
      <BrandStory />
      <CustomerReviews />
      <InstagramGallery />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
