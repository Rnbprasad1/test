import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Restaurant } from '../../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export function RestaurantCard({ restaurant, onEdit, onDelete, onToggleStatus }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Restaurant';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-lg font-semibold text-white">{restaurant.restaurantName}</h3>
          <p className="text-sm text-gray-200">{restaurant.location}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              restaurant.isOpen
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </span>
          {restaurant.isVegOnly && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Pure Veg
            </span>
          )}
          {restaurant.isNonVegOnly && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Non-Veg Only
            </span>
          )}
          {restaurant.isBothVegNonVegOnly && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Veg & Non-Veg
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{restaurant.area}</span>
          <button
            onClick={onToggleStatus}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              restaurant.isOpen
                ? 'bg-red-50 text-red-700 hover:bg-red-100'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            {restaurant.isOpen ? 'Mark as Closed' : 'Mark as Open'}
          </button>
        </div>
      </div>
    </div>
  );
}