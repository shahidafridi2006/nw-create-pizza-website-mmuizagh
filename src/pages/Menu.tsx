import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PizzaCard from "@/components/PizzaCard";
import { Pizza } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const CATEGORIES = ["all", "classic", "premium", "veggie"];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: pizzas, isLoading } = useQuery({
    queryKey: ['pizzas', activeCategory],
    queryFn: async () => {
      let query = supabase.from('pizzas').select('*');
      if (activeCategory !== "all") {
        query = query.eq('category', activeCategory);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Pizza[];
    }
  });

  const filteredPizzas = pizzas?.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground">Choose from our wide variety of artisanal pizzas</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search pizzas..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setActiveCategory(cat)}
            className="capitalize"
          >
            {cat}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-[350px] rounded-xl bg-muted animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPizzas?.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
          {filteredPizzas?.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">No pizzas found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
