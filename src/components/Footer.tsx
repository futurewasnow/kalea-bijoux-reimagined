
import { Heart, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Kalea Bijoux
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Handcrafted crystal earrings that celebrate your unique energy and style. Each piece is created with love and authentic crystals.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400 p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400 p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-rose-400 p-2">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Shop section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">All Earrings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Crystal Collections</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">By Color</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Gift Sets</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Sale Items</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Care</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Care Instructions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-rose-400 transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-rose-400 mr-3" />
                <span className="text-gray-300">hello@kaleabijoux.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-rose-400 mr-3" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-rose-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  123 Artisan Way<br />
                  Creative District<br />
                  San Francisco, CA 94102
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; 2024 Kalea Bijoux. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a>
              </div>
            </div>
            <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-400 mx-1" />
              <span>for crystal lovers worldwide</span>
            </div>
          </div>

          {/* Payment methods */}
          <div className="flex justify-center mt-8 space-x-6">
            <div className="text-xs text-gray-500 flex items-center space-x-4">
              <span>We accept:</span>
              <span className="bg-gray-800 px-3 py-1 rounded">Visa</span>
              <span className="bg-gray-800 px-3 py-1 rounded">Mastercard</span>
              <span className="bg-gray-800 px-3 py-1 rounded">PayPal</span>
              <span className="bg-gray-800 px-3 py-1 rounded">Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
