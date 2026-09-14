import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY;

let client: SupabaseClient | null = null;

/** Null until EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY are set (app/.env.local). */
export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  // Web static rendering runs without window; AsyncStorage needs it.
  if (process.env.EXPO_OS === "web" && typeof window === "undefined") return null;
  client ??= createClient(url, key, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  return client;
}

/** Returns the signed-in user id, creating an anonymous user on first use. */
export async function ensureUser(supabase: SupabaseClient): Promise<string> {
  const { data } = await supabase.auth.getSession();
  if (data.session) return data.session.user.id;
  const { data: signedIn, error } = await supabase.auth.signInAnonymously();
  if (error || !signedIn.user) throw error ?? new Error("Anonymous sign-in returned no user");
  return signedIn.user.id;
}
