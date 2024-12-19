import { supabase } from './client';
import { SUPABASE_CONFIG } from './config';

export async function signInToSupabase() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: SUPABASE_CONFIG.AUTH.EMAIL,
      password: SUPABASE_CONFIG.AUTH.PASSWORD,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Supabase authentication failed:', err);
    throw err;
  }
}

export async function signOutFromSupabase() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (err) {
    console.error('Supabase sign out failed:', err);
    throw err;
  }
}