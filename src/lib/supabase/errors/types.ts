export interface SupabaseError extends Error {
  code?: string;
  details?: unknown;
  hint?: string;
  statusCode?: number;
}

export interface AuthError extends SupabaseError {
  credentialError?: boolean;
}

export interface StorageError extends SupabaseError {
  storageError?: boolean;
}