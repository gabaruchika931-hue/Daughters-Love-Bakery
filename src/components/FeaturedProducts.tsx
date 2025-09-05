import { Button } from "@/components/ui/button";
import { Star, Award, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";

// ✅ Import images from src/assets
import trufflesImg from "@/assets/truffles.jpg";
import cakeImg from "@/assets/cake.jpg";

const FeaturedSection = () => {
  const highlights = [
    {
      icon: Award,
      title: "Handcrafted with Love",
      description:
        "Each creation is baked fresh, with artisanal care and precision.",
    },
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description:
        "We only use the finest, freshest ingredients — no shortcuts.",
    },
    {
      icon: Heart,
      title: "Loved by Thousands",
      description:
        "Over 1000+ happy customers who call us their go-to cakery.",
    },
  ];

  const featured = [
    {
      name: "Dark Chocolate Truffles",
      tagline: "Our All-Time Bestseller",
      image: trufflesImg,
      fallback: "bg-gradient-to-br from-[#5C4033] to-[#3D2B1F]",
    },
    {
      name: "Almond Honey Cake",
      tagline: "A Sweet Hug in Every Slice",
      image: cakeImg,
      fallback: "bg-gradient-to-br from-[#D4A373] to-[#FAE1C0]",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#F5F5DC] via-[#F0E6D6] to-[#E6DAC8]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-chocolate mb-4">
            Why Choose <span className="text-gold">Us?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We’re more than just desserts — we’re love, memories, and happiness
            served on a plate.
          </p>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="bg-card p-6 rounded-2xl shadow-warm hover:shadow-elegant transition transform hover:scale-105 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                <item.icon className="w-7 h-7 text-chocolate" />
              </div>
              <h3 className="text-xl font-bold text-chocolate mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Signature Creations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {featured.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-3xl overflow-hidden shadow-elegant group ${
                !item.image ? item.fallback : ""
              }`}
            >
              {/* Background Image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                />
              )}

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-chocolate/50 flex flex-col justify-center items-center text-center text-white p-6">
                <h3 className="text-3xl font-bold mb-2">{item.name}</h3>
                <p className="text-lg mb-4">{item.tagline}</p>

                {/* ✅ Navigate to Products Page */}
                <Link to="/products">
                  <Button variant="gold" size="lg">
                    Explore Collection
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Ribbon */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card rounded-full px-6 py-3 shadow-gold">
            <Star className="w-5 h-5 inline text-gold mr-2" />
            <span className="font-semibold text-chocolate">
              Rated 4.9/5 by 1000+ Happy Customers
            </span>
          </div>
        </div>
      </div>


    </section>
  );
};

export default FeaturedSection;
