"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  ShoppingCart,
  MessageCircle,
  X,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || "";

// ✅ Your WhatsApp Number
const WHATSAPP_NUMBER = "918284905725";

interface Product {
  id: number;
  name: string;
  price: number | string;
  image?: string;
}

const formatPrice = (value: any) => {
  const num = Number(value);
  return isNaN(num) ? value : `₹${num.toFixed(2)}`;
};

const TopProductsHorizontal = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🛒 Cart State
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  // ⚡ Buy Now Popup State
  const [buyNowItem, setBuyNowItem] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setShowCart(true);
  };

  const orderOnWhatsApp = (items: Product[]) => {
    if (!items.length) return;

    let message = `Hello! I would like to place an order:\n\n`;
    items.forEach((item, i) => {
      message += `${i + 1}. ${item.name} - ${formatPrice(item.price)}\n`;
    });
    message += `\nThank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/products?populate=image&pagination[limit]=4`,
          {
            headers: API_TOKEN
              ? { Authorization: `Bearer ${API_TOKEN}` }
              : {},
          }
        );
        const data = await res.json();
        const mapped = (data?.data || []).map((p: any) => {
          const firstImage = Array.isArray(p.image) ? p.image[0] : null;
          const imageUrl =
            firstImage?.formats?.thumbnail?.url ||
            firstImage?.url ||
            "/placeholder.svg?height=300&width=300";
          return {
            id: p.id,
            name: p.name,
            price: p.price,
            image: imageUrl,
          };
        });
        setProducts(mapped);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading top products...</p>;
  }

  return (
    <section className="py-20 bg-gradient-warm relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Floating Cart Button */}
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-chocolate text-white px-4 py-3 rounded-full shadow-xl flex items-center space-x-2 hover:scale-105 transition z-50"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>({cart.length})</span>
        </button>

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-gold mr-2 animate-pulse" />
            <span className="text-gold font-medium uppercase tracking-wider">
              Top Products
            </span>
            <Sparkles className="w-6 h-6 text-gold ml-2 animate-pulse" />
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
                <h4 className="text-2xl font-semibold text-chocolate mb-2">
                  {product.name}
                </h4>
                <p className="text-gold font-bold text-xl mb-4">
                  {formatPrice(product.price)}
                </p>
                <div className="flex gap-3 mt-auto">
                  <Button
                    variant="default"
                    className="flex-1 shadow-lg hover:shadow-gold transition-all"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="gold"
                    className="flex-1 shadow-lg hover:shadow-glow transition-all"
                    onClick={() => setBuyNowItem(product)}
                  >
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

      {/* CART POPUP */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowCart(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-chocolate mb-4 flex items-center">
              <ShoppingCart className="mr-2" /> Your Cart
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/70 p-3 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-chocolate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setCart((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <div className="mt-6 flex justify-between">
                <button
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => orderOnWhatsApp(cart)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 transition flex items-center"
                >
                  <MessageCircle className="mr-2" /> Order on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BUY NOW POPUP */}
      {buyNowItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setBuyNowItem(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-chocolate mb-4">
              Confirm Order
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={buyNowItem.image || "/placeholder.svg"}
                alt={buyNowItem.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold text-chocolate">
                  {buyNowItem.name}
                </p>
                <p className="text-gray-600">
                  {formatPrice(buyNowItem.price)}
                </p>
              </div>
            </div>
            <button
              onClick={() => orderOnWhatsApp([buyNowItem])}
              className="w-full bg-green-500 text-white px-4 py-3 rounded-lg shadow-md hover:scale-105 transition flex items-center justify-center"
            >
              <MessageCircle className="mr-2" /> Order via WhatsApp
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopProductsHorizontal;
