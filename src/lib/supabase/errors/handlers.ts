import type { SupabaseError, AuthError, StorageError } from './types';

export function handleAuthError(error: unknown): AuthError {
  const err = error as AuthError;
  return {
    name: 'AuthError',
    message: err.message || 'Authentication failed',
    credentialError: true,
    statusCode: err.statusCode,
    ...err
  };
}

export function handleStorageError(error: unknown): StorageError {
  const err = error as StorageError;
  return {
    name: 'StorageError',
    message: err.message || 'Storage operation failed',
    storageError: true,
    statusCode: err.statusCode,
    ...err
  };
}