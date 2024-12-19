import React from 'react';
import { Category } from '../../../types/category';
import { BarChart2 } from 'lucide-react';

interface CategoryStatsProps {
  categories: Category[];
}

export function CategoryStats({ categories }: CategoryStatsProps) {
  const totalCategories = categories.length;
  const globalCategories = categories.filter(c => c.isGlobal).length;
  const customCategories = totalCategories - globalCategories;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-indigo-600 font-medium">Total Categories</p>
            <h3 className="text-2xl font-bold text-indigo-900">{totalCategories}</h3>
          </div>
          <BarChart2 className="h-8 w-8 text-indigo-500" />
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 font-medium">Global Categories</p>
            <h3 className="text-2xl font-bold text-green-900">{globalCategories}</h3>
          </div>
          <BarChart2 className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-600 font-medium">Custom Categories</p>
            <h3 className="text-2xl font-bold text-purple-900">{customCategories}</h3>
          </div>
          <BarChart2 className="h-8 w-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}