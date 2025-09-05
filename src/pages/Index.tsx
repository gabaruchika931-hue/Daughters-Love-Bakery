import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials"; // ✅ New Section
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      {/* Hero Section */}
      <Hero />
      {/* Product Categories */}
      <ProductCategories />
      {/* Featured Products */}
      <FeaturedProducts />
      {/* About Section */}
      <About />
      {/* Testimonials / Reviews */}
      <Testimonials />
      {/* Footer with Contact Form */}
      <Footer />
    </div>
  );
};

export default Index;
