import React from 'react';
import { Clock } from 'lucide-react';
import { parseDate, formatDate } from '../../../lib/utils';
import { Product } from '../../../types';

interface DateFilterProps {
  products: Product[];
  onSelectDate: (date: string | null) => void;
  selectedDate: string | null;
}

export function DateFilter({ products, onSelectDate, selectedDate }: DateFilterProps) {
  // Get unique dates from products
  const uniqueDates = Array.from(new Set(
    products
      .filter(p => p.lastUpdated)
      .map(p => {
        const date = parseDate(p.lastUpdated);
        return date ? date.toISOString().split('T')[0] : null;
      })
      .filter(Boolean)
  )).sort().reverse();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectDate(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedDate === null
              ? 'bg-indigo-100 text-indigo-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Dates
        </button>
        {uniqueDates.map((date) => {
          const formattedDate = formatDate(parseDate(date));
          return (
            <button
              key={date}
              onClick={() => onSelectDate(date)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDate === date
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {formattedDate}
            </button>
          );
        })}
      </div>
    </div>
  );
}