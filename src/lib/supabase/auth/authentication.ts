import { supabase } from '../client';
import { AUTH_CONFIG } from '../config/auth';
import { handleAuthError } from '../errors/handlers';
import type { AuthError } from '../errors/types';

export async function signInToSupabase() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: AUTH_CONFIG.EMAIL,
      password: AUTH_CONFIG.PASSWORD,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    throw handleAuthError(err);
  }
}

export async function signOutFromSupabase() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (err) {
    throw handleAuthError(err);
  }
}