export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total_amount: number;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  pizza_id: string;
  quantity: number;
  price_at_time: number;
  created_at?: string;
  pizza?: Pizza;
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}
