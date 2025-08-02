import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Dark Chocolate Truffles",
      price: "$45",
      originalPrice: "$55",
      image: "/placeholder.svg?height=300&width=300&text=Truffles",
      rating: 4.9,
      reviews: 127,
      badge: "Bestseller",
      description: "Rich 70% dark chocolate truffles dusted with cocoa powder"
    },
    {
      id: 2,
      name: "Almond Honey Cake",
      price: "$28",
      originalPrice: "$32",
      image: "/placeholder.svg?height=300&width=300&text=Cake",
      rating: 4.8,
      reviews: 89,
      badge: "New",
      description: "Traditional recipe with premium almonds and wildflower honey"
    },
    {
      id: 3,
      name: "Mixed Nuts Premium",
      price: "$35",
      originalPrice: "$40",
      image: "/placeholder.svg?height=300&width=300&text=Nuts",
      rating: 4.7,
      reviews: 156,
      badge: "Organic",
      description: "Carefully selected cashews, almonds, and pistachios"
    },
    {
      id: 4,
      name: "Chocolate Covered Dates",
      price: "$32",
      originalPrice: "$38",
      image: "/placeholder.svg?height=300&width=300&text=Dates",
      rating: 4.9,
      reviews: 203,
      badge: "Limited",
      description: "Medjool dates covered in Belgian dark chocolate"
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Bestseller": return "default";
      case "New": return "secondary";
      case "Organic": return "outline";
      case "Limited": return "destructive";
      default: return "default";
    }
  };

  return (
    <section className="py-20 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-chocolate mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved products, carefully crafted to deliver exceptional taste and quality.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-warm hover:shadow-elegant transition-all duration-500 transform hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badge */}
                <Badge 
                  variant={getBadgeVariant(product.badge)}
                  className="absolute top-4 left-4 z-10"
                >
                  {product.badge}
                </Badge>

                {/* Wishlist Button */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-chocolate/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button variant="elegant" className="transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Quick Add
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex space-x-1 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3 className="text-lg font-bold text-chocolate mb-2 group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-chocolate">{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-gold hover:text-chocolate hover:border-gold transition-all duration-300">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="gold" size="lg" className="group">
            View All Products
            <ShoppingCart className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;