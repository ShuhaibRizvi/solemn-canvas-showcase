import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Premium Socks for
          <br />
          <span className="text-muted-foreground">Wholesale Partners</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Quality cotton socks designed for comfort and durability. 
          Competitive wholesale pricing with flexible minimum orders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-lg">
            <Link to="/products">View Catalog</Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="border-2 border-border hover:bg-accent rounded-xl px-8 py-4 text-lg"
          >
            <Link to="/get-quote">Request Samples</Link>
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-muted/50 rounded-xl">
            <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
            <p className="text-muted-foreground">Minimum Order</p>
          </div>
          <div className="p-6 bg-muted/50 rounded-xl">
            <h3 className="text-2xl font-bold text-foreground mb-2">24h</h3>
            <p className="text-muted-foreground">Quick Response</p>
          </div>
          <div className="p-6 bg-muted/50 rounded-xl">
            <h3 className="text-2xl font-bold text-foreground mb-2">100%</h3>
            <p className="text-muted-foreground">Cotton Quality</p>
          </div>
        </div>
      </div>
    </section>
  );
};