export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  website: string | null
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  price: number
  sale_price: number | null
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  tier: string
  price: number
  start_date: string
  end_date: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface WaitlistEntry {
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
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  user_id: string
  service_id: string
  appointment_date: string
  status: string
  notes: string | null
  technician: string | null
  created_at: string
  updated_at: string
}

export interface Estimate {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  service_type: string | null
  message: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  payment_id: string
  amount: number
  currency: string
  status: string
  payment_method: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface ServiceRequest {
  id: string
  user_id: string
  service_id: string
  preferred_date: string
  notes: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface WaitlistBump {
  id: string
  waitlist_id: string
  amount_paid: number
  positions_moved: number
  payment_id: string
  created_at: string
}

export interface EmailSubscriber {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  subscribed: boolean
  mailer_id: string | null
  created_at: string
  updated_at: string
}

export interface WeatherCache {
  id: string
  city: string
  state: string
  data: any
  fetched_at: string
}

export interface AIConversation {
  id: string
  user_id: string
  conversation_id: string
  messages: any
  created_at: string
  updated_at: string
}
