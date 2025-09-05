import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  // ✅ Smooth scroll for #contact and other anchors
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")!.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

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
      const res = await fetch(
        "https://tranquil-heart-1f2994ed04.strapiapp.com/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="bg-chocolate text-warm-white scroll-smooth">
      {/* Contact Form Section */}
      <div className="border-b border-warm-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Customizable Orders & Inquiries
            </h3>
            <p className="text-xl text-warm-white/80 mb-8">
              Have a special occasion or custom cake idea? Fill out the form
              below, and we’ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/60 focus:border-gold"
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/60 focus:border-gold"
                />
              </div>

              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                required
                className="bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/60 focus:border-gold"
              />

              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (e.g., Birthday Cake, Wedding Order)"
                required
                className="bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/60 focus:border-gold"
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your custom request..."
                required
                className="bg-warm-white/10 border-warm-white/20 text-warm-white placeholder:text-warm-white/60 focus:border-gold min-h-[120px]"
              />

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Mail className="w-4 h-4 ml-2" />
              </Button>

              {status === "success" && (
                <p className="text-emerald-400 mt-4 font-medium">
                  ✅ Your message has been sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 mt-4 font-medium">
                  ❌ Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-chocolate font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold">
                Daughters Love Cakery
              </span>
            </div>

            <p className="text-warm-white/80 mb-6 leading-relaxed max-w-md">
              From a home kitchen to a beloved cakery, we bake with passion,
              love, and the promise of{" "}
              <span className="italic">“love at first bite.”</span>
            </p>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gold/20 hover:text-gold"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gold/20 hover:text-gold"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gold/20 hover:text-gold"
              >
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-warm-white/80 hover:text-gold transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-warm-white/80 hover:text-gold transition-colors duration-300"
                >
                  Cakes
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-warm-white/80 hover:text-gold transition-colors duration-300"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-warm-white/80 hover:text-gold transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-warm-white/80 hover:text-gold transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-warm-white/80 hover:text-gold transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-warm-white/80">Lalheri Road, Khanna</p>
                  <p className="text-warm-white/80">Punjab, India</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <p className="text-warm-white/80">+91-9855371891</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <p className="text-warm-white/80">hello@daughterslove.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-warm-white/80 text-center md:text-left">
              © 2024 Daughters Love Cakery. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 mt-4 md:mt-0">
              <span className="text-warm-white/80">Baked with</span>
              <Heart className="w-4 h-4 text-gold fill-current" />
              <span className="text-warm-white/80">
                for cake lovers everywhere
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
