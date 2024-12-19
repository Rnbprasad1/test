import { useState, useEffect } from 'react';
import { Image } from '../types/image';
import * as ImageService from '../services/image-service';

export function useImages() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      const imagesData = await ImageService.fetchImages();
      setImages(imagesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch images');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (file: File, name: string, tags: string[] = [], userId: string) => {
    try {
      const url = await ImageService.addNewImage(file, name, tags, userId);
      await fetchImages();
      return url;
    } catch (err) {
      setError('Failed to upload image');
      throw err;
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      const image = images.find(img => img.id === imageId);
      if (!image) return;

      await ImageService.deleteImageById(imageId, image);
      await fetchImages();
    } catch (err) {
      setError('Failed to delete image');
      throw err;
    }
  };

  const searchImages = async (searchTerm: string) => {
    try {
      return await ImageService.searchImages(searchTerm);
    } catch (err) {
      setError('Failed to search images');
      return [];
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    addImage,
    deleteImage,
    searchImages,
    refreshImages: fetchImages
  };
}