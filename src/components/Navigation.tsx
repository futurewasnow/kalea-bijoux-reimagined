
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Collections</a>
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Blog</a>
            <a href="#" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">Search</Button>
            <Button variant="ghost" size="sm">Wishlist</Button>
            <Button variant="outline" size="sm" className="border-rose-200 text-rose-600 hover:bg-rose-50">
              Cart (0)
            </Button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
