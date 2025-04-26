export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          id: string
          user_id: string | null
          conversation_id: string | null
          messages: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          conversation_id?: string | null
          messages?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          conversation_id?: string | null
          messages?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string | null
          service_id: string | null
          appointment_date: string | null
          status: string | null
          notes: string | null
          technician: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          appointment_date?: string | null
          status?: string | null
          notes?: string | null
          technician?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          appointment_date?: string | null
          status?: string | null
          notes?: string | null
          technician?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      email_subscribers: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          subscribed: boolean | null
          mailer_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          subscribed?: boolean | null
          mailer_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          subscribed?: boolean | null
          mailer_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      estimates: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          service_type: string | null
          message: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          service_type?: string | null
          message?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          service_type?: string | null
          message?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string | null
          payment_id: string | null
          amount: number | null
          currency: string | null
          status: string | null
          payment_method: string | null
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          payment_id?: string | null
          amount?: number | null
          currency?: string | null
          status?: string | null
          payment_method?: string | null
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          payment_id?: string | null
          amount?: number | null
          currency?: string | null
          status?: string | null
          payment_method?: string | null
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      service_requests: {
        Row: {
          id: string
          user_id: string | null
          service_id: string | null
          preferred_date: string | null
          notes: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          preferred_date?: string | null
          notes?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          preferred_date?: string | null
          notes?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          icon: string | null
          price: number
          sale_price: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon?: string | null
          price: number
          sale_price?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string | null
          price?: number
          sale_price?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      waitlist: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip: string | null
          tier: string | null
          service: string | null
          position: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          tier?: string | null
          service?: string | null
          position: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
          tier?: string | null
          service?: string | null
          position?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      waitlist_bumps: {
        Row: {
          id: string
          waitlist_id: string | null
          amount_paid: number
          positions_moved: number
          payment_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          waitlist_id?: string | null
          amount_paid: number
          positions_moved: number
          payment_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          waitlist_id?: string | null
          amount_paid?: number
          positions_moved?: number
          payment_id?: string | null
          created_at?: string | null
        }
      }
      weather_cache: {
        Row: {
          id: string
          city: string | null
          state: string | null
          data: Json | null
          fetched_at: string | null
        }
        Insert: {
          id?: string
          city?: string | null
          state?: string | null
          data?: Json | null
          fetched_at?: string | null
        }
        Update: {
          id?: string
          city?: string | null
          state?: string | null
          data?: Json | null
          fetched_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
