import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Check if credentials are provided and not default placeholders
export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (
    supabaseUrl.includes('your-project') ||
    supabaseUrl.includes('example.supabase.co') ||
    supabaseAnonKey.includes('your-anon-key')
  ) {
    return false;
  }
  return true;
}

// Client for public / client-side and general server-side usage
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!_client) {
    _client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  return _client;
}

// Admin / Service Role client (bypasses RLS on the server)
let _adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const key = supabaseServiceKey || supabaseAnonKey;
  if (!_adminClient) {
    _adminClient = createClient(supabaseUrl, key, {
      auth: {
        persistSession: false,
      },
    });
  }

  return _adminClient;
}
