import React, { useState } from 'react';
import { Category } from '../../../types/category';
import { CategoryCard } from './category-card';
import { CategoryForm } from './category-form';
import { Search } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onToggleVisibility: (categoryId: string) => Promise<void>;
  onDeleteCategory: (categoryId: string) => Promise<void>;
  onUpdateCategory: (categoryId: string, data: Partial<Category>) => Promise<void>;
  onRefresh: () => Promise<void>;
}

export function CategoryList({ 
  categories,
  onToggleVisibility,
  onDeleteCategory,
  onUpdateCategory,
  onRefresh
}: CategoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await onDeleteCategory(categoryId);
      await onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map(category => (
          <div key={category.id}>
            {editingCategoryId === category.id ? (
              <CategoryForm
                category={category}
                onSave={async (updatedData) => {
                  await onUpdateCategory(category.id, updatedData);
                  setEditingCategoryId(null);
                }}
                onCancel={() => setEditingCategoryId(null)}
              />
            ) : (
              <CategoryCard
                category={category}
                onEdit={() => setEditingCategoryId(category.id)}
                onDelete={() => handleDelete(category.id)}
                onToggleVisibility={() => onToggleVisibility(category.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}