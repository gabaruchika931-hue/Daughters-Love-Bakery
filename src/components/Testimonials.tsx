"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Review {
  id: number;
  name: string;
  message: string;
  rating: number;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

const fetchReviews = async (): Promise<Review[]> => {
  const res = await fetch(`${API_URL}/api/reviews`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  const json = await res.json();

  return json.data
    .map((r: any) => ({
      id: r.id,
      name: r.Name, // ✅ top-level fields
      message: r.Message,
      rating: r.Rating,
      createdAt: r.createdAt,
    }))
    .sort(
      (a: Review, b: Review) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

const Testimonials = () => {
  const queryClient = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 60 * 1000, // ✅ cache for 1 min
  });

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

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
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            Name: formData.name,
            Message: formData.message,
            Rating: Number(formData.rating),
          },
        }),
      });

      const responseData = await res.json();
      console.log("Response from Strapi:", responseData);

      if (!res.ok) {
        throw new Error(
          responseData?.error?.message || "Failed to submit review"
        );
      }

      // refresh reviews
      queryClient.invalidateQueries({ queryKey: ["reviews"] });

      setFormData({ name: "", message: "", rating: 5 });
      setStatus("success");
    } catch (err) {
      console.error("Error submitting review:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="testimonials" className="bg-warm-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-chocolate mb-12">
          Testimonials & Reviews
        </h2>

        {/* Reviews Grid */}
        {isLoading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-chocolate/10"
              >
                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "text-gold fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">“{review.message}”</p>
                <h4 className="font-semibold text-chocolate">– {review.name}</h4>
              </div>
            ))}
          </div>
        )}

        {/* Review Form */}
        <div className="max-w-xl mx-auto text-left">
          <h3 className="text-2xl font-bold text-chocolate mb-4">
            Leave a Review
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

            <Button type="submit" variant="gold" size="lg" disabled={loading}>
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
                ❌ Could not submit your review. Please check console.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
