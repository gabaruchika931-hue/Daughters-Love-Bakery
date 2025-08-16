import { Sparkles } from "lucide-react";

const ProductsPage: React.FC = () => {
  const categories: { name: string; items: string[] }[] = [
    {
      name: "Dry Cakes",
      items: [
        "Vanilla",
        "Butterscotch",
        "Mango",
        "Strawberry",
        "Chocolate",
        "Black Current",
        "Blueberry",
        "Tutifruity",
        "Diet Cake",
      ],
    },
    {
      name: "Muffins",
      items: [
        "Chocofill Muffin",
        "Inside Mango Muffin",
        "Inside Strawberry Muffin",
        "Inside Cream Cheese Muffin",
      ],
    },
    {
      name: "Donuts",
      items: ["Classic Glazed", "Chocolate Dipped", "Strawberry Sprinkle"],
    },
    {
      name: "Bomblino",
      items: ["Chocolate Bomblino", "Caramel Bomblino", "Nutella Bomblino"],
    },
    {
      name: "Chocolate Bars",
      items: [
        "Biscoff Bar",
        "Milk Chocolate",
        "Dryfruit",
        "Cream Cheese",
        "Almond",
        "Walnut Nutella",
        "Ferrero",
        "Diet Bar",
      ],
    },
    {
      name: "Pan Cake Mix",
      items: ["Vanilla", "Chocolate"],
    },
    {
      name: "Chocolate Sauces",
      items: ["Classic Chocolate Sauce", "Dark Chocolate Sauce"],
    },
    {
      name: "Cake Mix",
      items: ["Vanilla", "Chocolate", "Red Velvet"],
    },
    {
      name: "Brownies",
      items: ["Classic Brownie", "Walnut Brownie", "Fudge Brownie"],
    },
    {
      name: "Truffles",
      items: ["Dark Chocolate Truffle", "Hazelnut Truffle", "Coconut Truffle"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-warm min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-gold mr-2" />
            <span className="text-gold font-medium uppercase tracking-wider">
              Our Full Menu
            </span>
            <Sparkles className="w-6 h-6 text-gold ml-2" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-chocolate mb-6">
            Explore All Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From decadent cakes to rich chocolates, here’s everything crafted
            with love at{" "}
            <span className="font-semibold text-gold">
              Daughters Love Bakery
            </span>.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category, index) => (
            <div
              key={category.name}
              id={category.name.toLowerCase().replace(/\s+/g, "-")}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h2 className="text-2xl font-bold text-chocolate mb-6 border-b-2 border-gold inline-block">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="p-6 rounded-2xl shadow-warm hover:shadow-luxury bg-white/70 backdrop-blur-sm transition transform hover:-translate-y-1 hover:scale-105"
                  >
                    <p className="text-lg font-semibold text-chocolate">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
