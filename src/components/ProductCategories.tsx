import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import dryFruitsImage from "@/assets/dry-fruits.jpg";
import dryCakesImage from "@/assets/dry-cakes.jpg";

const ProductCategories = () => {
  const categories = [
    {
      title: "Premium Chocolates",
      description: "Handcrafted luxury chocolates made with the finest cocoa beans from around the world.",
      image: "/placeholder.svg?height=400&width=400&text=Chocolates",
      color: "from-chocolate to-chocolate-light",
      textColor: "text-warm-white",
      price: "Starting from $25"
    },
    {
      title: "Artisanal Dry Cakes",
      description: "Traditional recipes passed down through generations, baked to perfection.",
      image: dryCakesImage,
      color: "from-gold to-gold-light",
      textColor: "text-chocolate",
      price: "Starting from $15"
    },
    {
      title: "Premium Dry Fruits",
      description: "Carefully selected and naturally dried fruits, packed with nutrients and flavor.",
      image: dryFruitsImage,
      color: "from-cream to-warm-white",
      textColor: "text-chocolate",
      price: "Starting from $20"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-gold mr-2" />
            <span className="text-gold font-medium uppercase tracking-wider">Our Specialties</span>
            <Sparkles className="w-6 h-6 text-gold ml-2" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-chocolate mb-6">
            Exquisite Product Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each category represents our commitment to quality, tradition, and the finest ingredients 
            sourced from trusted partners worldwide.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className="group relative overflow-hidden rounded-2xl shadow-warm hover:shadow-luxury transition-all duration-500 transform hover:scale-105 animate-bounce-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-20 animate-shimmer transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 h-96 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className={`text-2xl font-bold ${category.textColor} mb-3`}>
                    {category.title}
                  </h3>
                  <p className={`${category.textColor} opacity-90 mb-4 leading-relaxed`}>
                    {category.description}
                  </p>
                  <div className={`text-lg font-semibold ${category.textColor} mb-4`}>
                    {category.price}
                  </div>
                  <Button 
                    variant={category.textColor === "text-warm-white" ? "elegant" : "default"}
                    className="group/btn shadow-gold hover:shadow-glow transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10">Explore Collection</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-luxury rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow shadow-glow"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gold/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button variant="gold" size="lg" className="group shadow-luxury hover:shadow-glow transition-all duration-500 relative overflow-hidden animate-bounce-in">
            <span className="relative z-10">View All Products</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
            <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;