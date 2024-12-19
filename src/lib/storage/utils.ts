import { STORAGE_CONFIG } from '../supabase/config/storage';

export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const fileExt = originalName.split('.').pop();
  return `${timestamp}-${random}.${fileExt}`;
}

export function getPublicFilePath(fileName: string): string {
  return `${STORAGE_CONFIG.PUBLIC_PATH}/${fileName}`;
}

export function validateFileSize(size: number): boolean {
  return size <= STORAGE_CONFIG.MAX_FILE_SIZE;
}

export function validateMimeType(mimeType: string): boolean {
  return STORAGE_CONFIG.ALLOWED_MIME_TYPES.includes(mimeType);
}