import React, { useState } from 'react';
import { Image } from '../../../types/image';
import { ImageSearch } from './image-search';
import { ImageGrid } from './image-grid';
import { ImageUpload } from './image-upload';
import { ImageModal } from './image-modal';

interface ImagePickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  images: Image[];
  onSearch: (term: string) => void;
  onUpload: (file: File, name: string, tags: string[]) => Promise<string>;
}

export function ImagePicker({ onSelect, onClose, images, onSearch, onUpload }: ImagePickerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleUpload = async (file: File, name: string, tags: string[]) => {
    setIsUploading(true);
    try {
      const url = await onUpload(file, name, tags);
      onSelect(url);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Select Image</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <div className="mt-4">
            <ImageSearch onSearch={onSearch} />
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isUploading ? (
            <ImageUpload onUpload={handleUpload} onCancel={() => setIsUploading(false)} />
          ) : (
            <ImageGrid
              images={images}
              onSelect={(image) => setSelectedImage(image)}
              selectable
            />
          )}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => setIsUploading(!isUploading)}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isUploading ? 'Back to Gallery' : 'Upload New Image'}
          </button>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}