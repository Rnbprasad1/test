import React from 'react';
import { Image } from '../../../types/image';
import { Trash2, Copy } from 'lucide-react';

interface ImageGridProps {
  images: Image[];
  onDelete: (imageId: string) => Promise<void>;
  onCopyUrl: (url: string) => void;
}

export function ImageGrid({ images, onDelete, onCopyUrl }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onCopyUrl(image.url)}
              className="p-2 bg-white rounded-full text-gray-600 hover:text-indigo-600 mx-1"
              title="Copy URL"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(image.id)}
              className="p-2 bg-white rounded-full text-gray-600 hover:text-red-600 mx-1"
              title="Delete image"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm rounded-b-lg">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  );
}