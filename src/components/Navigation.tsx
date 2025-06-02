
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Kalea Bijoux
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#collections" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Shop All</a>
            <a href="#earrings" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Earrings</a>
            <a href="#crystals" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">By Crystal</a>
            <a href="#colors" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">By Color</a>
            <a href="#about" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Our Story</a>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden md:flex"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </Button>
            <Button variant="outline" size="sm" className="border-rose-200 text-rose-600 hover:bg-rose-50 relative">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Cart (0)
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">$0</span>
            </Button>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-rose-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for colorful crystal earrings..."
                className="w-full pl-10 pr-4 py-3 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-rose-100">
            <div className="space-y-4">
              <a href="#collections" className="block text-gray-700 hover:text-rose-500 transition-colors font-medium">Shop All</a>
              <a href="#earrings" className="block text-gray-700 hover:text-rose-500 transition-colors font-medium">Earrings</a>
              <a href="#crystals" className="block text-gray-700 hover:text-rose-500 transition-colors font-medium">By Crystal</a>
              <a href="#colors" className="block text-gray-700 hover:text-rose-500 transition-colors font-medium">By Color</a>
              <a href="#about" className="block text-gray-700 hover:text-rose-500 transition-colors font-medium">Our Story</a>
              <div className="pt-4 border-t border-rose-100">
                <Button variant="ghost" size="sm" className="w-full justify-start mb-2">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="w-5 h-5 mr-2" />
                  Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
