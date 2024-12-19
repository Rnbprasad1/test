import { supabase, STORAGE_CONFIG } from '../supabase';

export async function deleteImage(path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKET_NAME)
      .remove([path]);

    if (error) throw error;
  } catch (err) {
    console.error('Delete process failed:', err);
    throw err;
  }
}