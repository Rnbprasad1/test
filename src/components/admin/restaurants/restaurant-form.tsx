import React from 'react';
import { Restaurant } from '../../../types';

interface RestaurantFormProps {
  restaurant: Partial<Restaurant>;
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: keyof Restaurant, value: any) => void;
  isNew?: boolean;
}

export function RestaurantForm({ restaurant, onSave, onCancel, onChange, isNew = false }: RestaurantFormProps) {
  const handleRestaurantTypeChange = (type: 'veg' | 'nonveg' | 'both') => {
    onChange('isVegOnly', type === 'veg');
    onChange('isNonVegOnly', type === 'nonveg');
    onChange('isBothVegNonVegOnly', type === 'both');
  };

  const getSelectedType = () => {
    if (restaurant.isVegOnly) return 'veg';
    if (restaurant.isNonVegOnly) return 'nonveg';
    if (restaurant.isBothVegNonVegOnly) return 'both';
    return 'both'; // default value
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            value={restaurant.restaurantName || ''}
            onChange={(e) => onChange('restaurantName', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter restaurant name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={restaurant.location || ''}
            onChange={(e) => onChange('location', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area
          </label>
          <input
            type="text"
            value={restaurant.area || ''}
            onChange={(e) => onChange('area', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter area"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={restaurant.imageUrl || ''}
            onChange={(e) => onChange('imageUrl', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter image URL"
          />
        </div>
      </div>

      {restaurant.imageUrl && (
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
          <img
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Restaurant';
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={restaurant.isOpen || false}
              onChange={(e) => onChange('isOpen', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Currently Open</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Restaurant Type</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="restaurantType"
                checked={getSelectedType() === 'veg'}
                onChange={() => handleRestaurantTypeChange('veg')}
                className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Veg Only</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="restaurantType"
                checked={getSelectedType() === 'nonveg'}
                onChange={() => handleRestaurantTypeChange('nonveg')}
                className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Non-Veg Only</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="restaurantType"
                checked={getSelectedType() === 'both'}
                onChange={() => handleRestaurantTypeChange('both')}
                className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Both Veg & Non-Veg</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
        >
          {isNew ? 'Add Restaurant' : 'Save'}
        </button>
      </div>
    </div>
  );
}