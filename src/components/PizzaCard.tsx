import { Pizza } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(pizza);
    toast({
      title: "Added to cart",
      description: `${pizza.name} has been added to your order.`,
    });
  };

  return (
    <Card className="overflow-hidden group hover:shadow-elegant transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={pizza.image_url}
          alt={pizza.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-primary">
          ${pizza.price}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1">{pizza.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {pizza.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full" 
          variant="premium"
          disabled={!pizza.is_available}
        >
          <Plus className="mr-2 h-4 w-4" />
          {pizza.is_available ? "Add to Cart" : "Sold Out"}
        </Button>
      </CardFooter>
    </Card>
  );
}
