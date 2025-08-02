import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-chocolate text-warm-white">
      {/* Newsletter Section */}
      <div className="border-b border-warm-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Our Latest Delights
            </h3>
            <p className="text-xl text-warm-white/80 mb-8">
              Subscribe to receive exclusive offers, new product announcements, and gourmet recipes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/60 focus:border-gold"
              />
              <Button variant="gold" className="whitespace-nowrap">
                Subscribe
                <Mail className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-chocolate font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold">Gourmet Delights</span>
            </div>
            
            <p className="text-warm-white/80 mb-6 leading-relaxed max-w-md">
              Crafting premium chocolates, artisanal dry cakes, and the finest dry fruits 
              since 1995. Quality, tradition, and excellence in every bite.
            </p>

            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-gold/20 hover:text-gold">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gold/20 hover:text-gold">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gold/20 hover:text-gold">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-warm-white/80 hover:text-gold transition-colors duration-300">Home</a></li>
              <li><a href="#products" className="text-warm-white/80 hover:text-gold transition-colors duration-300">Products</a></li>
              <li><a href="#about" className="text-warm-white/80 hover:text-gold transition-colors duration-300">About Us</a></li>
              <li><a href="#contact" className="text-warm-white/80 hover:text-gold transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-gold transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-warm-white/80 hover:text-gold transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-warm-white/80">123 Gourmet Street</p>
                  <p className="text-warm-white/80">Food District, City 12345</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <p className="text-warm-white/80">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <p className="text-warm-white/80">hello@gourmetdelights.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-warm-white/80 text-center md:text-left">
              © 2024 Gourmet Delights. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 mt-4 md:mt-0">
              <span className="text-warm-white/80">Made with</span>
              <Heart className="w-4 h-4 text-gold fill-current" />
              <span className="text-warm-white/80">for food lovers everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;