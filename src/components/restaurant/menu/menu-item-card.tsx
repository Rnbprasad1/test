import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { MenuItem } from '../../../types';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleAvailability: () => void;
}

export function MenuItemCard({ item, onEdit, onDelete, onToggleAvailability }: MenuItemCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={item.imageURL}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Food+Item';
          }}
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className="text-lg font-semibold text-indigo-600">₹{item.price}</span>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  item.isVeg
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.isVeg ? 'Veg' : 'Non-Veg'}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  item.isAvailable
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onToggleAvailability}
          className={`mt-4 w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            item.isAvailable
              ? 'bg-red-50 text-red-700 hover:bg-red-100'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          {item.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
        </button>
      </div>
    </div>
  );
}