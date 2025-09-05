import { Button } from "@/components/ui/button";
import { Award, Users, Leaf, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Every cake is crafted with care, precision, and a dedication to perfection.",
    },
    {
      icon: Users,
      title: "From Home to Hearts",
      description:
        "What began as a small home kitchen has grown into a beloved cakery cherished by many.",
    },
    {
      icon: Leaf,
      title: "Fresh & Natural",
      description:
        "Made with love and only the freshest ingredients, free from unnecessary additives.",
    },
    {
      icon: Clock,
      title: "Baking with Passion",
      description:
        "After years of experimenting and perfecting recipes, every bake tells a story of love and dedication.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-beige-100 via-beige-200 to-beige-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="text-gold font-medium uppercase tracking-wider">
                Our Story
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-chocolate mb-6 leading-tight">
              Baked with Love Since
              <span className="text-gold"> the Beginning</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              What started as a young girl’s passion for baking at the age of 18,
              after countless experiments and experiences, has blossomed into a
              heartfelt journey. Today, at 25, that dream has turned a small
              home kitchen into a beloved cakery —{" "}
              <span className="font-semibold text-chocolate">
                Daughters Love Cakery
              </span>
              .
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Born out of love and devotion to the art of baking, our promise —{" "}
              <span className="italic">“love at first bite”</span> — is baked
              into every creation. Each cake is more than a dessert; it’s a
              story, a memory, and a celebration of love.
            </p>
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
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                7+
              </div>
              <div className="text-muted-foreground">Years of Passion</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                1000+
              </div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                50+
              </div>
              <div className="text-muted-foreground">Signature Creations</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                100%
              </div>
              <div className="text-muted-foreground">Love in Every Bite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
