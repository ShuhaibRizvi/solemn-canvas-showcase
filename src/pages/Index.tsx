import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <ContactSection />
      </main>
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 SockCo. All rights reserved. | Wholesale sock manufacturer & supplier
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
