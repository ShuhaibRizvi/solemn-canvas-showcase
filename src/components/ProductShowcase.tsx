import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import sockWhiteCrew from "@/assets/sock-white-crew.jpg";
import sockBlackAnkle from "@/assets/sock-black-ankle.jpg";
import sockGraySport from "@/assets/sock-gray-sport.jpg";
import sockWhiteNoshow from "@/assets/sock-white-noshow.jpg";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  min_order: string;
  category: string;
  image_url: string | null;
}

const categoryImages: Record<string, string> = {
  crew: sockWhiteCrew,
  ankle: sockBlackAnkle,
  sport: sockGraySport,
  "no-show": sockWhiteNoshow,
};

const categories = [
  { id: "all", name: "All Products" },
  { id: "crew", name: "Crew Socks" },
  { id: "ankle", name: "Ankle Socks" },
  { id: "no-show", name: "No-Show Socks" },
  { id: "sport", name: "Sport Socks" },
];

export const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from("products").select("*").eq("is_active", true);
    
    if (selectedCategory !== "all") {
      query = query.eq("category", selectedCategory);
    }
    
    const { data, error } = await query.order("name");
    
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const displayedProducts = products.slice(0, visibleCount);

  return (
    <section id="products" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Product Range
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted socks designed for comfort, durability, and style. 
            Available in bulk quantities with competitive wholesale pricing.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-xl"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Product Count */}
        <p className="text-center text-muted-foreground mb-8">
          Showing {displayedProducts.length} of {products.length} products
        </p>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image_url || categoryImages[product.category] || sockWhiteCrew}
                  price={Number(product.price)}
                  priceDisplay={`$${Number(product.price).toFixed(2)}`}
                  minOrder={product.min_order}
                  description={product.description}
                />
              ))}
            </div>

            {visibleCount < products.length && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="rounded-xl"
                >
                  Load More Products
                </Button>
              </div>
            )}
          </>
        )}
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Need custom colors, sizes, or branding? We offer full customization services.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-medium">
            Discuss Custom Orders
          </Button>
        </div>
      </div>
    </section>
  );
};