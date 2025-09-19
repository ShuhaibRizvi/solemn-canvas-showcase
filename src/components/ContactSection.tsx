import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-muted-foreground">
            Get in touch to discuss your wholesale needs and receive a custom quote.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card border border-border rounded-xl shadow-soft">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Get a Quote</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Order Quantity</label>
                <select className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none">
                  <option>500-1,000 pairs</option>
                  <option>1,000-5,000 pairs</option>
                  <option>5,000-10,000 pairs</option>
                  <option>10,000+ pairs</option>
                </select>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3">
                Send Inquiry
              </Button>
            </div>
          </Card>
          
          <Card className="p-8 bg-muted/50 border border-border rounded-xl">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Sales Team</h4>
                <p className="text-muted-foreground">sales@sockco.com</p>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Business Hours</h4>
                <p className="text-muted-foreground">Monday - Friday: 9AM - 6PM EST</p>
                <p className="text-muted-foreground">Saturday: 10AM - 4PM EST</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Minimum Orders</h4>
                <p className="text-muted-foreground">500 pairs per style/color</p>
                <p className="text-muted-foreground">Custom branding: 1,000 pairs minimum</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Lead Time</h4>
                <p className="text-muted-foreground">Standard orders: 2-3 weeks</p>
                <p className="text-muted-foreground">Custom orders: 4-6 weeks</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};