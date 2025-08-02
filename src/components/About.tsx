import { Button } from "@/components/ui/button";
import { Award, Users, Leaf, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest ingredients from trusted suppliers worldwide."
    },
    {
      icon: Users,
      title: "Family Tradition",
      description: "Three generations of expertise in creating exceptional gourmet products."
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "100% natural, no artificial preservatives or additives in any of our products."
    },
    {
      icon: Clock,
      title: "Artisanal Process",
      description: "Each product is carefully handcrafted using traditional methods and techniques."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="text-gold font-medium uppercase tracking-wider">Our Story</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-chocolate mb-6 leading-tight">
              Crafting Excellence Since
              <span className="text-gold"> 1995</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              What started as a small family business has grown into a trusted name in gourmet 
              delights. Our passion for quality and tradition drives everything we do, from 
              selecting the finest ingredients to perfecting our time-honored recipes.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Today, we continue to honor our heritage while embracing innovation, ensuring 
              that every product we create meets the highest standards of excellence and taste.
            </p>

            <Button variant="hero" size="lg" className="group">
              Learn More About Us
              <Award className="w-5 h-5 group-hover:animate-pulse" />
            </Button>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-card p-6 rounded-2xl shadow-warm hover:shadow-elegant transition-all duration-500 transform hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center mb-4 shadow-gold">
                  <feature.icon className="w-6 h-6 text-chocolate" />
                </div>
                
                <h3 className="text-xl font-bold text-chocolate mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-card rounded-3xl p-8 md:p-12 shadow-elegant">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">25+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">1000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">50+</div>
              <div className="text-muted-foreground">Premium Products</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">100%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;