import React from 'react';
import { Package, CheckCircle, XCircle } from 'lucide-react';
import { Product } from '../../../types';

interface CategoryStatsProps {
  categories: string[];
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddCategory: () => void;
}

export function CategoryStats({ categories, products, selectedCategory, onSelectCategory, onAddCategory }: CategoryStatsProps) {
  const getCategoryStats = (category: string) => {
    const categoryProducts = products.filter(p => p.category === category);
    const inStock = categoryProducts.filter(p => p.stock).length;
    const outOfStock = categoryProducts.filter(p => !p.stock).length;
    return { total: categoryProducts.length, inStock, outOfStock };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Category Overview</h3>
        <button
          onClick={onAddCategory}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          + New Category
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          onClick={() => onSelectCategory('all')}
          className={`cursor-pointer p-4 rounded-lg border transition-all ${
            selectedCategory === 'all'
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">All Products</span>
            <Package className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">Total: {products.length}</span>
            <span className="text-green-600 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              {products.filter(p => p.stock).length}
            </span>
            <span className="text-red-600 flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              {products.filter(p => !p.stock).length}
            </span>
          </div>
        </div>

        {categories.map(category => {
          const stats = getCategoryStats(category);
          return (
            <div
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`cursor-pointer p-4 rounded-lg border transition-all ${
                selectedCategory === category
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{category}</span>
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">Total: {stats.total}</span>
                <span className="text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {stats.inStock}
                </span>
                <span className="text-red-600 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {stats.outOfStock}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}