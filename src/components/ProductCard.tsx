import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  priceDisplay: string;
  minOrder: string;
  description: string;
}

export const ProductCard = ({ id, name, image, price, priceDisplay, minOrder, description }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

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
            <p className="text-2xl font-bold text-foreground">{priceDisplay}</p>
            <p className="text-xs text-muted-foreground">Min. order: {minOrder}</p>
          </div>
        </div>
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};