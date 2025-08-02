import { Button } from "@/components/ui/button";
import { Star, Award, Heart } from "lucide-react";
import heroImage from "@/assets/hero-chocolates.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in">
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-gold font-medium">Premium Quality Since 1995</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-warm-white mb-6 leading-tight">
            Indulge in 
            <span className="bg-gradient-gold bg-clip-text text-transparent"> Luxury</span>
            <br />
            Gourmet Delights
          </h1>

          <p className="text-xl md:text-2xl text-warm-white/90 mb-8 leading-relaxed">
            Discover our handcrafted chocolates, artisanal dry cakes, and premium dry fruits. 
            Each bite is a journey through exquisite flavors and unmatched quality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" className="group">
              Explore Collection
              <Heart className="w-5 h-5 group-hover:animate-pulse" />
            </Button>
            <Button variant="elegant" size="lg">
              Our Story
              <Award className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-warm-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">25+</div>
              <div className="text-warm-white/80">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">1000+</div>
              <div className="text-warm-white/80">Happy Customers</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">100%</div>
              <div className="text-warm-white/80">Natural Ingredients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-gold/20 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-40 right-20 w-8 h-8 bg-warm-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-5 w-12 h-12 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;