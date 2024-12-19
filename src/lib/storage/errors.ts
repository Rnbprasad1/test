import { handleStorageError } from '../supabase/errors/handlers';

export function handleUploadError(error: unknown): never {
  const storageError = handleStorageError(error);
  console.error('Upload failed:', storageError);
  throw storageError;
}

export function handleBucketError(error: unknown): never {
  const storageError = handleStorageError(error);
  console.error('Bucket operation failed:', storageError);
  throw storageError;
}