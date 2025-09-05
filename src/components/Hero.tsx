import { Button } from "@/components/ui/button";
import { Star, Award, Heart, CupSoda, Cookie } from "lucide-react";
import heroImage from "@/assets/hero-chocolates.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/90 via-chocolate/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-fade-up">
          {/* Premium Tag */}
          <div
            className="flex items-center space-x-2 mb-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          > 
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-warm-white mb-6 leading-tight animate-slide-in"
            style={{ animationDelay: "0.5s" }}
          >
            Indulge in{" "}
            <span className="bg-gradient-luxury bg-clip-text text-transparent animate-shimmer-slow relative">
              Daughters Love Bakery
              <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-30"></div>
            </span>
            <br />
            <span className="animate-pulse-slow text-gold drop-shadow-glow">
              Where Every Bite is Made with Love
            </span>
          </h1>

          <p className="text-lg md:text-xl text-warm-white/90 mb-10 leading-relaxed max-w-2xl">
            Discover handcrafted chocolates, artisanal dry cakes, and premium
            dry fruits. Each bite is a journey through <span className="text-gold">exquisite flavors</span> and{" "}
            <span className="text-gold">unmatched quality</span>.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link to="/products">
              <Button
                variant="hero"
                size="lg"
                className="group shadow-lg shadow-gold/40 hover:shadow-glow relative overflow-hidden transform hover:-translate-y-1 transition-all duration-500"
              >
                <span className="relative z-10">🍫 Explore Collection</span>
                <Heart className="w-5 h-5 ml-2 group-hover:animate-pulse relative z-10" />
                <div className="absolute inset-0 bg-gradient-gold animate-shimmer opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="elegant"
                size="lg"
                className="shadow-lg shadow-copper/30 hover:shadow-gold transform hover:-translate-y-1 transition-all duration-500 group"
              >
                Our Story
                <Award className="w-5 h-5 ml-2 group-hover:animate-bounce" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { value: "7+", label: "Years of Excellence" },
              { value: "1000+", label: "Happy Customers" },
              { value: "100%", label: "Natural Ingredients" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="backdrop-blur-md bg-white/10 border border-gold/20 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-500"
              >
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2 drop-shadow-glow">
                  {stat.value}
                </div>
                <div className="text-warm-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-gradient-luxury rounded-full animate-float shadow-glow hidden lg:block"></div>
      <div
        className="absolute bottom-40 right-20 w-10 h-10 bg-gradient-gold rounded-full animate-float shadow-gold"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-5 w-12 h-12 bg-gradient-shimmer rounded-full animate-float animate-rotate-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/3 left-10 w-8 h-8 bg-copper rounded-full animate-bounce-slow"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1/3 left-20 w-12 h-12 bg-bronze/40 rounded-full animate-glow"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Extra Floating Icons */}
      <CupSoda className="absolute top-1/4 left-1/4 w-10 h-10 text-gold animate-float hidden md:block" />
      <Cookie className="absolute bottom-20 right-1/3 w-12 h-12 text-warm-white/80 animate-float hidden md:block" />
    </section>
  );
};

export default Hero;
