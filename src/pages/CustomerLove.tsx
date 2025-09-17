"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Star, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://tranquil-heart-1f2994ed04.strapiapp.com";

interface Screenshot {
  url: string;
}

interface Review {
  id: number;
  name: string | null;
  screenshot?: Screenshot;
  review_text: string | null;
  rating: number;
  verified: boolean;
  featured: boolean | null;
  review_date: string;
}

const CustomerLove = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/customer-reviews?populate=*`);
        const data: Review[] = res.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          screenshot: item.screenshot ? { url: item.screenshot.url } : undefined,
          review_text: item.review_text,
          rating: Number(item.rating) || 0,
          verified: item.verified,
          featured: item.featured,
          review_date: item.review_date,
        }));
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold text-center text-chocolate mb-12">
        💖 Customer Love Wall
      </h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className={`relative bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] ${
              review.featured ? "border-4 border-gold" : ""
            }`}
            whileHover={{ y: -5 }}
          >
            {/* Screenshot */}
            {review.screenshot?.url && (
              <img
                src={review.screenshot.url}
                alt={review.name || "Customer Screenshot"}
                className="w-full h-80 object-contain cursor-pointer bg-gray-100"
                loading="lazy"
                onClick={() => setPreviewImage(review.screenshot!.url)}
              />
            )}

            <div className="p-4">
              {/* Customer Info */}
              <div className="flex items-center mb-3 space-x-3">
                <p className="font-semibold text-chocolate">
                  {review.name || "Anonymous"}
                </p>
                {review.verified && (
                  <span className="flex items-center text-sm text-green-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Verified
                  </span>
                )}
              </div>

              {/* Review Text */}
              {review.review_text ? (
                <p className="text-sm text-gray-700 italic mb-2">
                  {review.review_text}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic mb-2">
                  Screenshot only review
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Date */}
              <p className="text-xs text-gray-500">
                {new Date(review.review_date).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fullscreen Image Preview */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
          >
            <motion.img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <X
              className="absolute top-5 right-5 w-8 h-8 text-white cursor-pointer"
              onClick={() => setPreviewImage(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerLove;
