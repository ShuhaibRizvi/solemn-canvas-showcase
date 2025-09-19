import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-foreground">SockCo</h1>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Wholesale</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-foreground hover:text-muted-foreground transition-colors">
              Products
            </a>
            <a href="#about" className="text-foreground hover:text-muted-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-muted-foreground transition-colors">
              Contact
            </a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            Get Quote
          </Button>
        </div>
      </div>
    </header>
  );
};