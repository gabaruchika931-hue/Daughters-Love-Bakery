"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  ShoppingCart,
  X,
  MessageCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || "";

// ✅ Your WhatsApp Number
const WHATSAPP_NUMBER = "918284905725";

interface Product {
  id: number;
  name?: string;
  price?: string | number;
  originalPrice?: string | number;
  soldOut?: boolean;
  image?: {
    url?: string | null;
  };
}

interface Category {
  id: number;
  name?: string;
  products?: Product[];
}

const formatPrice = (value: any) => {
  const num = Number(value);
  return isNaN(num) ? value : `Rs. ${num.toFixed(2)}`;
};

// ✅ Cache Settings
const CACHE_KEY = "cached_categories";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

const ProductsPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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
    const fetchCategories = async () => {
      try {
        // ✅ Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setCategories(parsed.data);
            setLoading(false);
            return;
          }
        }

        // ✅ Fetch from API
        const res = await fetch(
          `${API_URL}/api/categories?populate[products][populate]=image`,
          {
            headers: API_TOKEN
              ? {
                  Authorization: `Bearer ${API_TOKEN}`,
                  "Content-Type": "application/json",
                }
              : {},
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();

        const mapped = (data?.data || []).map((cat: any) => {
          return {
            id: cat.id,
            name: cat.name,
            products:
              (cat.products || []).map((prod: any) => {
                const firstImage = Array.isArray(prod.image)
                  ? prod.image[0]
                  : null;

                const imageUrl =
                  firstImage?.formats?.thumbnail?.url ||
                  firstImage?.url ||
                  null;

                return {
                  id: prod.id,
                  name: prod.name,
                  price: prod.price,
                  originalPrice: prod.originalPrice,
                  soldOut: prod.soldOut,
                  image: { url: imageUrl },
                };
              }) || [],
          };
        });

        // ✅ Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: mapped, timestamp: Date.now() })
        );

        setCategories(mapped);
      } catch (error) {
        console.error("Error fetching categories:", error);

        // ✅ Fallback: Use old cached data if API fails
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          setCategories(parsed.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading products...</p>;
  }

  return (
    <section
      className="relative py-20 min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/bakery-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90 backdrop-blur-sm"></div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-chocolate text-white px-4 py-3 rounded-full shadow-xl flex items-center space-x-2 hover:scale-105 transition"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>({cart.length})</span>
      </button>

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
                        src={item.image?.url || "/placeholder.jpg"}
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
                        setCart((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Buttons */}
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
                src={buyNowItem.image?.url || "/placeholder.jpg"}
                alt={buyNowItem.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold text-chocolate">
                  {buyNowItem.name}
                </p>
                <p className="text-gray-600">{formatPrice(buyNowItem.price)}</p>
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

      {/* Page Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-gold mr-2 animate-pulse" />
            <span className="text-gold font-medium uppercase tracking-wider">
              Our Full Menu
            </span>
            <Sparkles className="w-6 h-6 text-gold ml-2 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate mb-6 drop-shadow-lg">
            Explore All Products
          </h1>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((category, index) => {
            const catName = category.name ?? "Unnamed Category";
            const products = category.products ?? [];

            return (
              <div
                key={category.id}
                id={catName.toLowerCase().replace(/\s+/g, "-")}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <h2 className="text-2xl font-bold text-chocolate mb-6 border-b-2 border-gold inline-block">
                  {catName}
                </h2>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.length > 0 ? (
                    products.map((product) => {
                      const imgUrl =
                        product.image?.url || "/placeholder.jpg";

                      return (
                        <div
                          key={product.id}
                          className="relative bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden group"
                        >
                          {/* Product Image */}
                          <div className="relative">
                            <img
                              src={imgUrl}
                              alt={product.name || "Unnamed Product"}
                              className="w-full h-56 object-contain p-6"
                            />
                            {product.soldOut && (
                              <span className="absolute top-3 left-3 bg-gray-800/80 text-white text-xs font-semibold px-2 py-1 rounded">
                                Sold Out
                              </span>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="p-4">
                            <p className="text-base font-semibold text-chocolate line-clamp-2 min-h-[48px]">
                              {product.name || "Unnamed Product"}
                            </p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="text-lg font-bold text-chocolate">
                                {product.price
                                  ? formatPrice(product.price)
                                  : "Price Unavailable"}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Buttons */}
                            <div className="mt-4 flex space-x-3">
                              <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-chocolate text-white py-2 rounded-lg shadow hover:scale-105 transition"
                              >
                                Add to Cart
                              </button>
                              <button
                                onClick={() => setBuyNowItem(product)}
                                className="flex-1 bg-gold text-chocolate py-2 rounded-lg shadow hover:scale-105 transition"
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 italic">
                      No products available in this category.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
