import React, { useState } from 'react';

interface CategoryFormProps {
  onSave: (categoryName: string) => void;
  onCancel: () => void;
  existingCategories: string[];
}

export function CategoryForm({ onSave, onCancel, existingCategories }: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmedName = categoryName.trim();
    if (!trimmedName) {
      setError('Category name is required');
      return;
    }
    if (existingCategories.includes(trimmedName)) {
      setError('Category already exists');
      return;
    }
    onSave(trimmedName);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              setError('');
            }}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter category name"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}