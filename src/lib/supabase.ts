import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ─── Lazy singletons ───────────────────────────────────────────────────────
// Instantiated on first call so that build-time module evaluation
// (without real env vars) doesn't throw.

let _admin: SupabaseClient | null = null;
let _client: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the service-role key.
 * Bypasses Row Level Security. NEVER expose to the browser.
 * Use in API routes and Server Components.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
      );
    }
    _admin = createClient(url, key, { auth: { persistSession: false } });
  }
  return _admin;
}

/**
 * Browser-safe Supabase client using the anon key.
 * Use in Client Components for public reads or real-time subscriptions.
 */
export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    }
    _client = createClient(url, key);
  }
  return _client;
}
