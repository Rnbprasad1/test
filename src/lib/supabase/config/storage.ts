// Storage configuration
export const STORAGE_CONFIG = {
  BUCKET_NAME: 'images',
  MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  CACHE_DURATION: 3600,
  PUBLIC_PATH: 'public'
} as const;