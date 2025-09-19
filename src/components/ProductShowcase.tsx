import { ProductCard } from "./ProductCard";
import sockWhiteCrew from "@/assets/sock-white-crew.jpg";
import sockBlackAnkle from "@/assets/sock-black-ankle.jpg";
import sockGraySport from "@/assets/sock-gray-sport.jpg";
import sockWhiteNoshow from "@/assets/sock-white-noshow.jpg";

const products = [
  {
    name: "Premium Cotton Crew",
    image: sockWhiteCrew,
    price: "$2.50",
    minOrder: "500 pairs",
    description: "Classic crew socks made from 100% premium cotton. Perfect for everyday wear with superior comfort."
  },
  {
    name: "Athletic Ankle Socks",
    image: sockBlackAnkle,
    price: "$2.25",
    minOrder: "500 pairs", 
    description: "Performance ankle socks designed for active lifestyles. Moisture-wicking with reinforced heel and toe."
  },
  {
    name: "Sport Performance",
    image: sockGraySport,
    price: "$2.75",
    minOrder: "500 pairs",
    description: "Advanced sport socks with cushioned sole and arch support. Ideal for athletic and outdoor activities."
  },
  {
    name: "No-Show Essentials",
    image: sockWhiteNoshow,
    price: "$2.00",
    minOrder: "500 pairs",
    description: "Invisible no-show socks that stay hidden in shoes. Lightweight design with non-slip heel grip."
  }
];

export const ProductShowcase = () => {
  return (
    <section id="products" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Product Range
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted socks designed for comfort, durability, and style. 
            Available in bulk quantities with competitive wholesale pricing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Need custom colors, sizes, or branding? We offer full customization services.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-medium transition-colors">
            Discuss Custom Orders
          </button>
        </div>
      </div>
    </section>
  );
};