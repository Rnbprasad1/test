import React, { useState } from 'react';
import { Search, X, Text, Tag, Calendar, Image } from 'lucide-react';
import { searchOptions, type SearchOptionId } from './search-options';

const icons = {
  Text,
  Tag,
  Calendar,
  Image
} as const;

interface EnhancedSearchProps {
  onSearch: (term: string, option: SearchOptionId) => void;
  placeholder?: string;
}

export function EnhancedSearch({ onSearch, placeholder = 'Search...' }: EnhancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<SearchOptionId>('name');
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleSearch = () => {
    onSearch(searchTerm.trim(), selectedOption);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOptionSelect = (optionId: SearchOptionId) => {
    setSelectedOption(optionId);
    setIsOptionsVisible(false);
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim(), optionId);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('', selectedOption);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeholder}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsOptionsVisible(!isOptionsVisible)}
          className="absolute right-3 top-full mt-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Search by: {searchOptions.find(opt => opt.id === selectedOption)?.label}
        </button>
      </div>

      {isOptionsVisible && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
          <div className="py-1">
            {searchOptions.map((option) => {
              const Icon = icons[option.icon];
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 hover:bg-gray-100 ${
                    selectedOption === option.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {searchOptions.map((option) => {
          const Icon = icons[option.icon];
          return (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedOption === option.id
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4 mr-1" />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}