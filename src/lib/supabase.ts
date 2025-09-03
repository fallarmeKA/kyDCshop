import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  game_id: string;
  game_title: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  cover_image: string;
  platforms: string[];
  genre: string;
  created_at: string;
}
