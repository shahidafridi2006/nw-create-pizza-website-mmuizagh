import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import PizzaCard from "@/components/PizzaCard";
import { Pizza } from "@/types";
import { ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";

export default function Home() {
  const { data: featuredPizzas, isLoading } = useQuery({
    queryKey: ['featured-pizzas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pizzas')
        .select('*')
        .limit(3);
      if (error) throw error;
      return data as Pizza[];
    }
  });

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden hero-pattern">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary">
              <Star className="mr-2 h-4 w-4 fill-primary" />
              Voted #1 Pizza in the City
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight">
              Happiness is a <span className="text-primary">Warm Slice</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Experience the authentic taste of hand-tossed artisanal pizzas, 
              crafted with premium ingredients and delivered fresh to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button size="lg" variant="premium" className="text-lg px-8">
                  Order Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" 
              alt="Delicious Pizza" 
              className="relative rounded-2xl shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: "30 Min Delivery", desc: "Fastest delivery in town or it's free." },
            { icon: Star, title: "Premium Quality", desc: "Only the freshest organic ingredients." },
            { icon: ShieldCheck, title: "Safe & Secure", desc: "Contactless delivery and secure payments." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="container">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold">Chef's Recommendations</h2>
            <p className="text-muted-foreground">Our most popular slices this week</p>
          </div>
          <Link href="/menu">
            <Button variant="link" className="text-primary">View all menu</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPizzas?.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
