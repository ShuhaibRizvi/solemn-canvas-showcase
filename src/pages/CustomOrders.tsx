import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Palette, Package, FileText, Users } from "lucide-react";

const sockTypes = [
  { id: "crew", name: "Crew Socks", description: "Classic mid-calf length" },
  { id: "ankle", name: "Ankle Socks", description: "Low-cut sporty style" },
  { id: "no-show", name: "No-Show Socks", description: "Hidden in shoes" },
  { id: "sport", name: "Sport Socks", description: "Athletic performance" },
  { id: "compression", name: "Compression Socks", description: "Support & recovery" },
  { id: "dress", name: "Dress Socks", description: "Formal & professional" },
];

const materials = [
  { id: "standard-cotton", name: "Standard Cotton Blend" },
  { id: "premium-cotton", name: "Premium Cotton" },
  { id: "bamboo", name: "Bamboo Blend" },
  { id: "merino-wool", name: "Merino Wool" },
  { id: "compression", name: "Compression Fabric" },
];

const colorOptions = [
  { id: "black", name: "Black", hex: "#000000" },
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "navy", name: "Navy", hex: "#1a365d" },
  { id: "gray", name: "Gray", hex: "#6b7280" },
  { id: "red", name: "Red", hex: "#dc2626" },
  { id: "custom", name: "Custom Color", hex: null },
];

const logoPlacementOptions = [
  { id: "cuff", name: "Cuff" },
  { id: "sole", name: "Sole" },
  { id: "side", name: "Side Panel" },
  { id: "multiple", name: "Multiple Locations" },
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const pricingTiers = [
  { range: "500-999", discount: "Base pricing", perPair: "$3.50" },
  { range: "1,000-4,999", discount: "10% off", perPair: "$3.15" },
  { range: "5,000-9,999", discount: "20% off", perPair: "$2.80" },
  { range: "10,000+", discount: "Custom pricing", perPair: "Contact us" },
];

const CustomOrders = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    sockType: "",
    material: "",
    primaryColor: "",
    secondaryColor: "",
    customColorNote: "",
    logoPlacement: "",
    logoDescription: "",
    sizes: [] as string[],
    quantity: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    additionalRequirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-inquiry", {
        body: {
          companyName: formData.companyName,
          email: formData.email,
          orderQuantity: formData.quantity,
          website: "",
          isCustomOrder: true,
          customOrderDetails: {
            sockType: formData.sockType,
            material: formData.material,
            colors: {
              primary: formData.primaryColor,
              secondary: formData.secondaryColor,
              customNote: formData.customColorNote,
            },
            logoPlacement: formData.logoPlacement,
            logoDescription: formData.logoDescription,
            sizes: formData.sizes,
            additionalRequirements: formData.additionalRequirements,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Custom Order Request Submitted",
        description: "Our team will review your requirements and contact you within 24-48 hours.",
      });

      setFormData({
        sockType: "",
        material: "",
        primaryColor: "",
        secondaryColor: "",
        customColorNote: "",
        logoPlacement: "",
        logoDescription: "",
        sizes: [],
        quantity: "",
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        additionalRequirements: "",
      });
    } catch (error: any) {
      console.error("Failed to submit custom order:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const getEstimatedPrice = () => {
    const qty = parseInt(formData.quantity) || 0;
    if (qty >= 10000) return "Custom";
    if (qty >= 5000) return `$${(qty * 2.8).toLocaleString()}`;
    if (qty >= 1000) return `$${(qty * 3.15).toLocaleString()}`;
    if (qty >= 500) return `$${(qty * 3.5).toLocaleString()}`;
    return "Min. 500 pairs";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Create Your Custom Socks
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Design premium socks that match your brand perfectly. Tell us your requirements and we'll bring your vision to life.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { icon: Package, label: "Sock Type" },
              { icon: Palette, label: "Design" },
              { icon: FileText, label: "Branding" },
              { icon: Users, label: "Contact" },
            ].map((step, index) => (
              <div key={step.label} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                {index < 3 && <div className="w-8 h-px bg-border hidden sm:block" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Sock Type */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Choose Your Sock Type
              </h2>
              <RadioGroup
                value={formData.sockType}
                onValueChange={(value) => setFormData({ ...formData, sockType: value })}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {sockTypes.map((type) => (
                  <Label
                    key={type.id}
                    htmlFor={type.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.sockType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <RadioGroupItem value={type.id} id={type.id} />
                    <div>
                      <p className="font-medium text-foreground">{type.name}</p>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Section 2: Design Options */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Design & Material
              </h2>

              <div className="space-y-6">
                {/* Material */}
                <div className="space-y-2">
                  <Label>Material</Label>
                  <Select
                    value={formData.material}
                    onValueChange={(value) => setFormData({ ...formData, material: value })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, primaryColor: color.id })}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            formData.primaryColor === color.id
                              ? "border-primary ring-2 ring-primary ring-offset-2"
                              : "border-border"
                          }`}
                          style={{
                            backgroundColor: color.hex || undefined,
                            background: !color.hex
                              ? "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)"
                              : undefined,
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color (Optional)</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, secondaryColor: color.id })}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            formData.secondaryColor === color.id
                              ? "border-primary ring-2 ring-primary ring-offset-2"
                              : "border-border"
                          }`}
                          style={{
                            backgroundColor: color.hex || undefined,
                            background: !color.hex
                              ? "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)"
                              : undefined,
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {(formData.primaryColor === "custom" || formData.secondaryColor === "custom") && (
                  <div className="space-y-2">
                    <Label htmlFor="customColorNote">Custom Color Details</Label>
                    <Input
                      id="customColorNote"
                      name="customColorNote"
                      value={formData.customColorNote}
                      onChange={handleChange}
                      placeholder="e.g., Pantone 185 C or hex #FF0000"
                      className="rounded-xl"
                    />
                  </div>
                )}

                {/* Sizes */}
                <div className="space-y-2">
                  <Label>Available Sizes</Label>
                  <div className="flex flex-wrap gap-3">
                    {sizeOptions.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={formData.sizes.includes(size)}
                          onCheckedChange={() => handleSizeToggle(size)}
                        />
                        <Label htmlFor={`size-${size}`} className="cursor-pointer">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Branding */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Branding & Logo
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Logo Placement</Label>
                  <Select
                    value={formData.logoPlacement}
                    onValueChange={(value) => setFormData({ ...formData, logoPlacement: value })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select placement" />
                    </SelectTrigger>
                    <SelectContent>
                      {logoPlacementOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoDescription">Logo/Design Description</Label>
                  <Textarea
                    id="logoDescription"
                    name="logoDescription"
                    value={formData.logoDescription}
                    onChange={handleChange}
                    placeholder="Describe your logo or design requirements. You can also share file links or detailed specifications..."
                    className="rounded-xl min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Quantity & Pricing */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Quantity & Pricing</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Order Quantity (pairs)</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="500"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Minimum 500 pairs"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  {formData.quantity && parseInt(formData.quantity) >= 500 && (
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-sm text-muted-foreground">Estimated Total</p>
                      <p className="text-2xl font-bold text-foreground">{getEstimatedPrice()}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Final pricing provided after review
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Volume Pricing</p>
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.range}
                      className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">{tier.range} pairs</p>
                        <p className="text-sm text-muted-foreground">{tier.discount}</p>
                      </div>
                      <p className="font-semibold text-foreground">{tier.perPair}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 5: Contact Information */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Contact Information
              </h2>

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

              <div className="mt-6 space-y-2">
                <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                <Textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  placeholder="Any other specifications, deadlines, or questions..."
                  className="rounded-xl min-h-[100px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Custom Order Request"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CustomOrders;
