// Supabase configuration constants
export const SUPABASE_CONFIG = {
  URL: 'https://ztoddnqhksgmlanzcaqi.supabase.co',
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0b2RkbnFoa3NnbWxhbnpjYXFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MDY0ODQsImV4cCI6MjA1MDA4MjQ4NH0.d2HTrowgjhJSIv4M7y5zEm8VaSzaghUW3EN7Kze3LXg',
  STORAGE: {
    BUCKET_NAME: 'images',
    MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  },
  AUTH: {
    EMAIL: 'thirupathiraju52@gmail.com',
    PASSWORD: 'Haryak@552'
  }
} as const;