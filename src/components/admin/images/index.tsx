import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useImages } from '../../../hooks/useImages';
import { useAuthStore } from '../../../store/auth-store';
import { ImageUpload } from './image-upload';
import { ImageGrid } from './image-grid';
import { ImageSearch } from './image-search';
import { initializeBucket } from '../../../lib/storage/bucket';

export function ImagesManagement() {
  const { user } = useAuthStore();
  const { images, loading, error, addImage, deleteImage, searchImages } = useImages();
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [searchResults, setSearchResults] = useState(images);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeBucket();
      } catch (err) {
        setInitError('Failed to initialize storage. Please try again later.');
        console.error('Storage initialization failed:', err);
      }
    };
    init();
  }, []);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults(images);
      return;
    }
    const results = await searchImages(term);
    setSearchResults(results);
  };

  const handleUpload = async (file: File, name: string, tags: string[]) => {
    if (!user) return;
    try {
      await addImage(file, name, tags, user.id);
      setIsAddingImage(false);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading images...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(error || initError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error || initError}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Image Library</h2>
          <button
            onClick={() => setIsAddingImage(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </button>
        </div>

        <div className="mb-6">
          <ImageSearch onSearch={handleSearch} />
        </div>

        {isAddingImage ? (
          <div className="mb-6">
            <ImageUpload
              onUpload={handleUpload}
              onCancel={() => setIsAddingImage(false)}
            />
          </div>
        ) : (
          <ImageGrid
            images={searchResults}
            onDelete={deleteImage}
            onCopyUrl={handleCopyUrl}
          />
        )}
      </div>
    </div>
  );
}