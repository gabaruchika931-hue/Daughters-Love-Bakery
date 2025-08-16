import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <br></br>
      <br></br>
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
