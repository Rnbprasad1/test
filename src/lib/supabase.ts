import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ztoddnqhksgmlanzcaqi.supabase.co';
const supabaseKey = 'e7b579035c0fb435601ff4448ae7746917d38c4da1eb68fe243b9047e139e94c';

// Initialize Supabase client with anon key
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false // Since we're using Firebase auth
  }
});

export const STORAGE_CONFIG = {
  BUCKET_NAME: 'images',
  MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
} as const;