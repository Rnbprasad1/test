import React from 'react';
import { Category } from '../../../types/category';
import { Edit2, Eye, EyeOff, Trash2 } from 'lucide-react';
import { formatDate } from '../../../lib/utils';

interface CategoryCardProps {
  category: Category;
  userId: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
}

export function CategoryCard({ 
  category, 
  userId, 
  onEdit, 
  onDelete, 
  onToggleVisibility 
}: CategoryCardProps) {
  const isHidden = category.hiddenBy?.includes(userId);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={category.iconURL}
                alt={category.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=Icon';
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">
                Created {formatDate(new Date(category.createdAt))}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleVisibility}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              title={isHidden ? "Show category" : "Hide category"}
            >
              {isHidden ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-gray-100"
              title="Edit category"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
              title="Delete category"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}