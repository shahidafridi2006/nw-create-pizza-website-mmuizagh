import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Order, OrderItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, MapPin } from "lucide-react";

export default function Orders() {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            pizza:pizzas (*)
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Order & { order_items: (OrderItem & { pizza: any })[] })[];
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Please login to view your orders</h1>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-muted animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">
                  Order #{order.id.slice(0, 8)}
                </CardTitle>
                <Badge variant={
                  order.status === 'delivered' ? 'default' : 
                  order.status === 'cancelled' ? 'destructive' : 'secondary'
                }>
                  {order.status.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {order.address}
                  </div>
                  <div className="flex items-center text-sm font-bold text-primary">
                    Total: ${order.total_amount}
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <p className="text-sm font-medium mb-2 flex items-center">
                    <Package className="mr-2 h-4 w-4" /> Items
                  </p>
                  <div className="space-y-1">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="text-sm flex justify-between">
                        <span>{item.quantity}x {item.pizza?.name || 'Pizza'}</span>
                        <span>${(item.price_at_time * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {orders?.length === 0 && (
            <div className="text-center py-20 border rounded-xl bg-muted/30">
              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
