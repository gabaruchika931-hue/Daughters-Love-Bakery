"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  Send,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  User,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

interface Review {
  id: number;
  name: string;
  message: string;
  rating: number;
  avatar?: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

const Testimonials = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: { perView: 3, spacing: 30 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 20 } },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 12 } },
    },
  });

  const fetchReviews = async (pageNum: number) => {
    setLoadingReviews(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/reviews?pagination[page]=${pageNum}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`,
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        }
      );

      const mapped = res.data.data.map((r: any) => ({
        id: r.id,
        name: r.Name,
        message: r.Message,
        rating: r.Rating,
        avatar: r.Avatar?.url || null,
        createdAt: r.createdAt,
      }));

      setReviews(mapped);
      setTotalPages(res.data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await axios.post(
        `${API_URL}/api/reviews`,
        {
          data: {
            Name: formData.name,
            Message: formData.message,
            Rating: Number(formData.rating),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setFormData({ name: "", message: "", rating: 5 });
      setStatus("success");

      fetchReviews(page);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    } catch (err) {
      console.error("Error submitting review:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="testimonials" className="relative bg-gradient-to-b from-warm-white to-pink-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-chocolate mb-6">
          Loved by Our Sweet Customers 🍩
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Every treat tells a story — here’s what our happy customers have to say 💕
        </p>

        {/* Reviews Slider */}
        {loadingReviews ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : (
          <div className="relative">
            <div ref={sliderRef} className="keen-slider">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="keen-slider__slide bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between relative"
                >
                  <Quote className="absolute top-4 right-4 text-pink-200 w-8 h-8" />
                  
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    “{review.message}”
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    {review.avatar ? (
                      <img
                        src={`${API_URL}${review.avatar}`}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-pink-300"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-chocolate text-white flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <h4 className="font-semibold text-chocolate">
                      – {review.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-chocolate hover:text-white transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-chocolate hover:text-white transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Review Form */}
        <div className="max-w-xl mx-auto text-left mt-20 bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-chocolate mb-4">
            ✨ Your Voice Shapes Our Journey — Share Your Sweet Story
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300"
            />
            <Textarea
              name="message"
              placeholder="Your Review"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300"
            />
            <div>
              <label className="block mb-2 font-medium text-chocolate">
                Rating
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={loading}
              className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {loading ? "Submitting..." : "Submit Review"}
              <Send className="w-4 h-4 ml-2" />
            </Button>

            {status === "success" && (
              <p className="text-green-600 mt-3">
                ✅ Thank you! Your review has been submitted.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-3">
                ❌ Could not submit your review.
              </p>
            )}
          </form>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Link to="/customer-love">
            <Button
              variant="gold"
              size="lg"
              className="px-10 py-4 text-lg rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              🍰 Join the Wall of Love →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
