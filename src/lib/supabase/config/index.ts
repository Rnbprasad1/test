import { SUPABASE_CONSTANTS } from './constants';
import { STORAGE_CONFIG } from './storage';
import { AUTH_CONFIG } from './auth';

export const SUPABASE_CONFIG = {
  ...SUPABASE_CONSTANTS,
  STORAGE: STORAGE_CONFIG,
  AUTH: AUTH_CONFIG
} as const;

export type SupabaseConfig = typeof SUPABASE_CONFIG;