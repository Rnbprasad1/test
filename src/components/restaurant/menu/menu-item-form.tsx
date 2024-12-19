import React from 'react';
import { MenuItem } from '../../../types';

interface MenuItemFormProps {
  item: Partial<MenuItem>;
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: keyof MenuItem, value: string | number | boolean) => void;
  isNew?: boolean;
}

export function MenuItemForm({ item, onSave, onCancel, onChange, isNew = false }: MenuItemFormProps) {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Item Name"
              value={item.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              value={item.price || ''}
              onChange={(e) => onChange('price', parseFloat(e.target.value) || 0)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={item.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            id="imageURL"
            type="url"
            placeholder="Image URL"
            value={item.imageURL || ''}
            onChange={(e) => onChange('imageURL', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {item.imageURL && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={item.imageURL}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=Food';
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={item.isVeg || false}
              onChange={(e) => onChange('isVeg', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Vegetarian</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={item.isAvailable || false}
              onChange={(e) => onChange('isAvailable', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Available</span>
          </label>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isNew ? 'Add Item' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}