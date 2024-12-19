import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationCardProps {
  city: string;
  imageUrl: string;
  restaurantCount: number;
  isSelected: boolean;
  onSelect: () => void;
  type?: 'restaurants' | 'products';
}

export function LocationCard({ 
  city, 
  imageUrl, 
  restaurantCount, 
  isSelected, 
  onSelect,
  type = 'restaurants' 
}: LocationCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
      }`}
    >
      <div className="aspect-[16/9]">
        <img
          src={imageUrl}
          alt={city}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <h3 className="text-lg font-semibold">{city}</h3>
        </div>
        <p className="text-sm text-gray-200">
          {restaurantCount} {type === 'products' ? 'Products' : 'Restaurants'}
        </p>
      </div>
    </div>
  );
}