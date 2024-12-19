import { supabase } from '../supabase/client';
import { SUPABASE_CONFIG } from '../supabase/config';
import { validateImageFile } from './validation';
import type { UploadResult } from './types';

function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const fileExt = originalName.split('.').pop();
  return `${timestamp}-${random}.${fileExt}`;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  try {
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      throw new Error(validation.errors.join('. '));
    }

    const fileName = generateUniqueFileName(file.name);
    const filePath = `public/${fileName}`;
    
    // Upload file
    const { data, error: uploadError } = await supabase.storage
      .from(SUPABASE_CONFIG.STORAGE.BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) throw uploadError;
    if (!data?.path) throw new Error('Upload succeeded but no path returned');

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(SUPABASE_CONFIG.STORAGE.BUCKET_NAME)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) throw new Error('Failed to get public URL');

    return {
      url: urlData.publicUrl,
      path: data.path
    };
  } catch (err) {
    console.error('Upload process failed:', err);
    throw err;
  }
}