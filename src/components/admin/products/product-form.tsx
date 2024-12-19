import React from 'react';
import { Product } from '../../../types/product';
import { Category } from '../../../types/category';

interface ProductFormProps {
  product: Partial<Product>;
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: keyof Product, value: any) => void;
  isNew?: boolean;
  cities: { name: string; imageUrl: string; }[];
}

export function ProductForm({
  product,
  categories,
  onSave,
  onCancel,
  onChange,
  isNew = false,
  cities
}: ProductFormProps) {
  const visibleCategories = categories.filter(category => 
    !(category.hiddenBy || []).includes(product.createdBy || '')
  );

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Existing form fields */}
        
        {/* Updated category selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={product.categoryId || ''}
            onChange={(e) => onChange('categoryId', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {visibleCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rest of the form fields */}
      </div>
    </div>
  );
}