import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

const GetQuote = () => {
  const { toast } = useToast();
  const { items, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      quantity: "",
      message: "",
    });
    clearCart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get a Quote
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your wholesale sock needs and we'll provide a custom quote
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Cart Items Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Selected Products ({totalItems})
                </h2>
                
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No products selected. Browse our catalog to add items to your quote request.
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive shrink-0"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-medium">
                        <span>Estimated Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Final pricing will be provided in your quote
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Estimated Total Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 1000 pairs total"
                    className="rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your requirements, customization needs, or any questions..."
                    className="rounded-xl min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-4 text-lg"
                >
                  Submit Quote Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetQuote;
