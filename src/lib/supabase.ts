import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      rsvp_responses: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          attending: boolean;
          number_of_guests: number;
          dietary_restrictions: string;
          message: string;
          qr_code: string | null;
          event_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          attending: boolean;
          number_of_guests: number;
          dietary_restrictions?: string;
          message?: string;
          qr_code?: string | null;
          event_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          attending?: boolean;
          number_of_guests?: number;
          dietary_restrictions?: string;
          message?: string;
          qr_code?: string | null;
          event_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};