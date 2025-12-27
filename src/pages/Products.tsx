import { Header } from "@/components/Header";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ContactSection } from "@/components/ContactSection";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            Our Products
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Browse our complete catalog of premium wholesale socks
          </p>
        </div>
        <ProductShowcase />
        <ContactSection />
      </main>
    </div>
  );
};

export default Products;
