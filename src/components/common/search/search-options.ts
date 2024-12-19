export const searchOptions = [
    { id: 'name', label: 'Name', icon: 'Text' },
    { id: 'tag', label: 'Tags', icon: 'Tag' },
    { id: 'date', label: 'Date', icon: 'Calendar' },
    { id: 'type', label: 'Type', icon: 'Image' }
  ] as const;
  
  export type SearchOptionId = typeof searchOptions[number]['id'];