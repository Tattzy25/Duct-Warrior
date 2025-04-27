// Re-export from our singleton implementation
import { getSupabaseClient, getServerSupabaseClient } from "./supabase-singleton"

export const createClientSupabaseClient = getSupabaseClient
export const createServerSupabaseClient = getServerSupabaseClient
