import { supabase } from '../supabase/client';
import { SUPABASE_CONFIG } from '../supabase/config';
import { signInToSupabase } from '../supabase/auth';
import type { BucketConfig } from './types';

async function getBucketConfig(): Promise<BucketConfig> {
  return {
    public: true,
    allowedMimeTypes: SUPABASE_CONFIG.STORAGE.ALLOWED_MIME_TYPES,
    fileSizeLimit: SUPABASE_CONFIG.STORAGE.MAX_FILE_SIZE
  };
}

async function createBucket() {
  const config = await getBucketConfig();
  const { data, error } = await supabase.storage.createBucket(
    SUPABASE_CONFIG.STORAGE.BUCKET_NAME,
    config
  );

  if (error) throw error;
  return data;
}

async function updateBucket() {
  const config = await getBucketConfig();
  const { data, error } = await supabase.storage.updateBucket(
    SUPABASE_CONFIG.STORAGE.BUCKET_NAME,
    config
  );

  if (error) throw error;
  return data;
}

export async function initializeBucket() {
  try {
    // First authenticate
    await signInToSupabase();

    // Check existing buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    const bucketExists = buckets?.some(b => b.name === SUPABASE_CONFIG.STORAGE.BUCKET_NAME);

    // Create or update bucket
    if (!bucketExists) {
      await createBucket();
    } 

    return { success: true };
  } catch (err) {
    console.error('Bucket initialization failed:', err);
    throw err;
  }
}