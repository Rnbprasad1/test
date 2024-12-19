import React from 'react';
import { X } from 'lucide-react';
import { Image } from '../../../types/image';

interface ImageModalProps {
  image: Image;
  onClose: () => void;
  onSelect?: (url: string) => void;
}

export function ImageModal({ image, onClose, onSelect }: ImageModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{image.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-auto max-h-[60vh] object-contain"
          />
          
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              {image.tags?.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {onSelect && (
              <button
                onClick={() => onSelect(image.url)}
                className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Select Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}