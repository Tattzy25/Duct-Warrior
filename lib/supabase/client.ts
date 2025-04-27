// Re-export from our singleton implementation
import { getSupabaseClient } from "../supabase-singleton"

export const createClientSupabaseClient = getSupabaseClient
