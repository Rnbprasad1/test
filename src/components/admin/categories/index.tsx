import React, { useState } from 'react';
import { CategoryList } from './category-list';
import { CategoryStats } from './category-stats';
import { CategoryForm } from './category-form';
import { Plus } from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import { Category } from '../../../types/category';

export function CategoriesManagement() {
  const {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryVisibility,
    refreshCategories
  } = useCategories();

  const [isAddingCategory, setIsAddingCategory] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Category Management</h2>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </button>
        </div>

        {isAddingCategory && (
          <div className="mb-6">
            <CategoryForm
              onSave={async (categoryData) => {
                const success = await addCategory(categoryData as Omit<Category, 'id'>);
                if (success) {
                  setIsAddingCategory(false);
                }
              }}
              onCancel={() => setIsAddingCategory(false)}
            />
          </div>
        )}

        <CategoryStats categories={categories} />
        <CategoryList 
          categories={categories}
          onToggleVisibility={toggleCategoryVisibility}
          onDeleteCategory={deleteCategory}
          onUpdateCategory={updateCategory}
          onRefresh={refreshCategories}
        />
      </div>
    </div>
  );
}