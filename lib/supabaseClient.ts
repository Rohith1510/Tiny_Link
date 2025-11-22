/**
 * Supabase Client Configuration
 * 
 * This file initializes and exports the Supabase client for database operations.
 * The client is configured using environment variables for security.
 */

import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and anonymous key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase environment variables. Please check your .env.local file.\n' +
        'Required variables:\n' +
        '- NEXT_PUBLIC_SUPABASE_URL\n' +
        '- NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
}

// Database types for type-safe queries
export interface Link {
    id: string
    code: string
    target_url: string
    clicks: number
    last_clicked: string | null
    created_at: string
}

export type Database = {
    public: {
        Tables: {
            links: {
                Row: Link
                Insert: Omit<Link, 'id' | 'created_at' | 'clicks' | 'last_clicked'> & {
                    id?: string
                    clicks?: number
                    last_clicked?: string | null
                    created_at?: string
                }
                Update: Partial<Omit<Link, 'id'>>
            }
        }
    }
}

// Create and export the Supabase client with type safety
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
