import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  image: string;
  price: string;
  minOrder: string;
  description: string;
}

export const ProductCard = ({ name, image, price, minOrder, description }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border border-border bg-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square bg-secondary/50 overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-foreground">{price}</p>
            <p className="text-xs text-muted-foreground">Min. order: {minOrder}</p>
          </div>
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
          Request Quote
        </Button>
      </div>
    </Card>
  );
};