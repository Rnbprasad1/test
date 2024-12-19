import React, { useState, useEffect } from 'react';
import { Category } from '../../../types/category';

interface CategoryFormProps {
  category?: Partial<Category>;
  onSave: (categoryData: Partial<Category>) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    iconURL: '',
    ...category
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        iconURL: category.iconURL || '',
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Category name is required');
      return;
    }

    if (!formData.iconURL?.trim()) {
      setError('Icon URL is required');
      return;
    }

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-white shadow-sm">
      <div className="space-y-4">
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="iconURL" className="block text-sm font-medium text-gray-700 mb-1">
            Icon URL
          </label>
          <input
            id="iconURL"
            type="url"
            value={formData.iconURL}
            onChange={(e) => setFormData(prev => ({ ...prev, iconURL: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {formData.iconURL && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Icon Preview:</p>
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={formData.iconURL}
                alt="Category Icon"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64?text=Icon';
                }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            {category ? 'Save Changes' : 'Add Category'}
          </button>
        </div>
      </div>
    </form>
  );
}