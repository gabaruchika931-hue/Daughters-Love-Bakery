"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

interface Product {
  id: number;
  name: string;
  price: string;
  image?: string;
}

const TopProductsHorizontal = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products?populate=image&pagination[limit]=4`);
        const data = await res.json();
        const topProducts = data.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image?.[0]?.url || "/placeholder.svg?height=300&width=300",
        }));
        setProducts(topProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-gold mr-2" />
            <span className="text-gold font-medium uppercase tracking-wider">Top Products</span>
            <Sparkles className="w-6 h-6 text-gold ml-2" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-chocolate mb-4">
            Our Best Picks
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our top products curated just for you.
          </p>
        </div>

        {/* Horizontal Cards */}
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[320px] h-[480px] bg-white/20 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-500 group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
                <h4 className="text-2xl font-semibold text-chocolate mb-2">{product.name}</h4>
                <p className="text-gold font-bold text-xl mb-4">₹{product.price}</p>
                <div className="flex gap-3 mt-auto">
                  <Button variant="default" className="flex-1 shadow-lg hover:shadow-gold transition-all">
                    Add to Cart
                  </Button>
                  <Button variant="gold" className="flex-1 shadow-lg hover:shadow-glow transition-all">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button
              variant="gold"
              size="lg"
              className="group shadow-luxury hover:shadow-glow transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10">View All Products</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopProductsHorizontal;
