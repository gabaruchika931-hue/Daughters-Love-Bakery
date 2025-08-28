"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, Star } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sparkles, setSparkles] = useState<{ x: number; y: number; id: number }[]>([]);

  // Generate random sparkle positions
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev.filter((s) => Date.now() - s.id < 1000), // remove old sparkles
        { x: Math.random() * 70, y: Math.random() * 70, id: Date.now() },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg border-b border-chocolate/20 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo with floating sparkles */}
          <div className="flex items-center space-x-3 relative">
            <div className="w-20 h-20 rounded-full bg-white/50 backdrop-blur-md shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105 relative">
              <img
                src={logo}
                alt="Daughters Love Cakery Logo"
                className="object-contain w-full h-full"
              />
              {/* Sparkles */}
              {sparkles.map((s) => (
                <Star
                  key={s.id}
                  className="absolute w-3 h-3 text-gold animate-pulse"
                  style={{ left: s.x, top: s.y }}
                />
              ))}
            </div>

            <span className="text-2xl md:text-3xl font-extrabold text-chocolate tracking-wide drop-shadow-sm">
              Daughter&apos;s Love Bakery
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-chocolate font-medium hover:text-gold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gold after:shadow-[0_0_8px_rgba(255,215,0,0.7)] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative group hover:bg-white/30 transition-all duration-300"
            >
              <ShoppingBag className="h-6 w-6 text-chocolate group-hover:text-gold transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 bg-gold text-chocolate text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                3
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-chocolate" />
              ) : (
                <Menu className="h-6 w-6 text-chocolate" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white/40 backdrop-blur-md border-t border-chocolate/20 rounded-b-2xl shadow-lg">
              {["Home", "Products", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-chocolate font-medium hover:text-gold transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
