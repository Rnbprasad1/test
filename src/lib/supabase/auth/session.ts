import { supabase } from '../client';
import type { User, Session } from '@supabase/supabase-js';

export async function getCurrentSession(): Promise<Session | null> {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}