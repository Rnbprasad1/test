import React, { useState } from 'react';
import { Edit2, Trash2, Clock, Copy, Check } from 'lucide-react';
import { Product } from '../../../types';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStock: () => void;
  onCopyToCity: (cityName: string) => Promise<void>;
  cities: { name: string; imageUrl: string }[];
  copyingTo: string | null;
}

export function ProductCard({ 
  product, 
  onEdit, 
  onDelete, 
  onToggleStock,
  onCopyToCity,
  cities,
  copyingTo
}: ProductCardProps) {
  const [showCityMenu, setShowCityMenu] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="relative h-48">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Product';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowCityMenu(!showCityMenu)}
              className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 transition-colors"
              title="Copy to another city"
            >
              <Copy className="h-4 w-4" />
            </button>
            {showCityMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {cities.map(city => (
                    <button
                      key={city.name}
                      onClick={() => onCopyToCity(city.name)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center justify-between"
                      disabled={copyingTo === city.name}
                    >
                      <span>{city.name}</span>
                      {copyingTo === city.name && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onEdit}
            className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="flex flex-col space-y-2">
            <span className="px-2 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-800">
              {product.category}
            </span>
            <span className="px-2 py-1 bg-indigo-500/90 rounded-full text-sm font-medium text-white">
              {product.city}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          </div>
          <span className="text-lg font-semibold text-indigo-600">₹{product.price}</span>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>
              {product.lastUpdated ? new Date(product.lastUpdated).toLocaleDateString() : 'Not updated yet'}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Quantity: {product.quantity} {product.unit}
            </span>
          </div>
          <button
            onClick={onToggleStock}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.stock
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
          >
            {product.stock ? 'In Stock' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}