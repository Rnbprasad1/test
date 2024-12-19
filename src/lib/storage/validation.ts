import { SUPABASE_CONFIG } from '../supabase/config';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateImageFile(file: File): ValidationResult {
  const errors: string[] = [];

  if (file.size > SUPABASE_CONFIG.STORAGE.MAX_FILE_SIZE) {
    errors.push(`File size exceeds ${SUPABASE_CONFIG.STORAGE.MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  if (!SUPABASE_CONFIG.STORAGE.ALLOWED_MIME_TYPES.includes(file.type)) {
    errors.push('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}