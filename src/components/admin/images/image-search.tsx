import React from 'react';
import { EnhancedSearch } from '../../common/search/enhanced-search';
import type { SearchOptionId } from '../../common/search/search-options';

interface ImageSearchProps {
  onSearch: (term: string) => void;
}

export function ImageSearch({ onSearch }: ImageSearchProps) {
  const handleSearch = (term: string, option: SearchOptionId) => {
    // You can enhance this to handle different search options
    onSearch(term);
  };

  return (
    <EnhancedSearch
      onSearch={handleSearch}
      placeholder="Search images by name, tags, or type..."
    />
  );
}