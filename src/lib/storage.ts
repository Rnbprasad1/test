import { supabase } from './supabase';

export async function uploadImage(file: File, bucket: string): Promise<{ url: string; path: string }> {
  try {
    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('File size exceeds 2MB limit');
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    if (!data?.path) {
      throw new Error('Upload succeeded but no path returned');
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    return {
      url: urlData.publicUrl,
      path: data.path
    };
  } catch (err) {
    console.error('Upload process failed:', err);
    throw err;
  }
}

export async function deleteImage(path: string, bucket: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      throw new Error(`Delete failed: ${error.message}`);
    }
  } catch (err) {
    console.error('Delete process failed:', err);
    throw err;
  }
}