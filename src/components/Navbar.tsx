import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-chocolate/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-chocolate font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-chocolate">Daughter's Love Bakery</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-chocolate hover:text-gold transition-colors duration-300">Home</a>
            <a href="#products" className="text-chocolate hover:text-gold transition-colors duration-300">Products</a>
            <a href="#about" className="text-chocolate hover:text-gold transition-colors duration-300">About</a>
            <a href="#contact" className="text-chocolate hover:text-gold transition-colors duration-300">Contact</a>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gold text-chocolate text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-warm-white border-t border-chocolate/10">
              <a href="#home" className="block px-3 py-2 text-chocolate hover:text-gold transition-colors duration-300">Home</a>
              <a href="#products" className="block px-3 py-2 text-chocolate hover:text-gold transition-colors duration-300">Products</a>
              <a href="#about" className="block px-3 py-2 text-chocolate hover:text-gold transition-colors duration-300">About</a>
              <a href="#contact" className="block px-3 py-2 text-chocolate hover:text-gold transition-colors duration-300">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;