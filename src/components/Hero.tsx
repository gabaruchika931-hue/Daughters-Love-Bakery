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
        <div className="max-w-3xl animate-slide-in-left">
          <div className="flex items-center space-x-2 mb-6 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold animate-glow" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
            <span className="text-gold font-medium relative">
              Premium Quality Since 1995
              <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-30"></div>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-warm-white mb-6 leading-tight animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
            Indulge in 
            <span className="bg-gradient-luxury bg-clip-text text-transparent animate-glow relative">
              Luxury
              <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-20"></div>
            </span>
            <br />
            <span className="animate-pulse-slow">Gourmet Delights</span>
          </h1>

          <p className="text-xl md:text-2xl text-warm-white/90 mb-8 leading-relaxed">
            Discover our handcrafted chocolates, artisanal dry cakes, and premium dry fruits. 
            Each bite is a journey through exquisite flavors and unmatched quality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button variant="hero" size="lg" className="group shadow-luxury hover:shadow-glow transition-all duration-500 relative overflow-hidden">
              <span className="relative z-10">Explore Collection</span>
              <Heart className="w-5 h-5 group-hover:animate-pulse relative z-10" />
              <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Button>
            <Button variant="elegant" size="lg" className="shadow-gold hover:shadow-luxury transition-all duration-500 group">
              Our Story
              <Award className="w-5 h-5 group-hover:animate-bounce" />
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

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-gradient-luxury rounded-full animate-float shadow-glow hidden lg:block"></div>
      <div className="absolute bottom-40 right-20 w-8 h-8 bg-gradient-gold rounded-full animate-float shadow-gold" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-5 w-12 h-12 bg-gradient-shimmer rounded-full animate-float animate-rotate-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-10 w-6 h-6 bg-copper rounded-full animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/3 left-20 w-10 h-10 bg-bronze/30 rounded-full animate-glow" style={{ animationDelay: '1.5s' }}></div>
    </section>
  );
};

export default Hero;