import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuthStore } from '../../store/auth-store';
import { Restaurant } from '../../types';
import { Edit2, Save, X } from 'lucide-react';

export function RestaurantProfile() {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [restaurant, setRestaurant] = useState<Partial<Restaurant>>({
    restaurantName: '',
    location: '',
    area: '',
    isOpen: true,
    imageUrl: '',
    isVegOnly: false,
    isNonVegOnly: false,
    isBothVegNonVegOnly: true,
  });
  const [editedRestaurant, setEditedRestaurant] = useState<Partial<Restaurant>>(restaurant);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!user) return;
      
      try {
        const restaurantDoc = await getDoc(doc(db, 'restaurants', user.id));
        if (restaurantDoc.exists()) {
          const data = restaurantDoc.data() as Restaurant;
          setRestaurant(data);
          setEditedRestaurant(data);
        }
      } catch (err) {
        setError('Failed to fetch restaurant details');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await setDoc(doc(db, 'restaurants', user.id), {
        ...editedRestaurant,
        ownerId: user.id,
      });
      setRestaurant(editedRestaurant);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Failed to save restaurant details');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEditedRestaurant((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      {!isEditing && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="relative h-64">
            <img
              src={restaurant.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'}
              alt={restaurant.restaurantName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{restaurant.restaurantName}</h1>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{restaurant.restaurantName}</h2>
                <p className="text-gray-600">{restaurant.location}</p>
                <p className="text-gray-600">{restaurant.area}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  restaurant.isOpen
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {restaurant.isOpen ? 'Open' : 'Closed'}
              </span>
              {restaurant.isVegOnly && (
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  Pure Veg
                </span>
              )}
              {restaurant.isNonVegOnly && (
                <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                  Non-Veg Only
                </span>
              )}
              {restaurant.isBothVegNonVegOnly && (
                <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  Veg & Non-Veg
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Edit Restaurant Profile</h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedRestaurant(restaurant);
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={editedRestaurant.restaurantName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={editedRestaurant.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={editedRestaurant.area}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Restaurant Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={editedRestaurant.imageUrl}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {editedRestaurant.imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">Preview:</p>
                  <img
                    src={editedRestaurant.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isOpen"
                  checked={editedRestaurant.isOpen}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Currently Open</span>
              </label>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Restaurant Type</div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="restaurantType"
                    checked={editedRestaurant.isVegOnly}
                    onChange={() => setEditedRestaurant(prev => ({
                      ...prev,
                      isVegOnly: true,
                      isNonVegOnly: false,
                      isBothVegNonVegOnly: false,
                    }))}
                    className="border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Veg Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="restaurantType"
                    checked={editedRestaurant.isNonVegOnly}
                    onChange={() => setEditedRestaurant(prev => ({
                      ...prev,
                      isVegOnly: false,
                      isNonVegOnly: true,
                      isBothVegNonVegOnly: false,
                    }))}
                    className="border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Non-Veg Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="restaurantType"
                    checked={editedRestaurant.isBothVegNonVegOnly}
                    onChange={() => setEditedRestaurant(prev => ({
                      ...prev,
                      isVegOnly: false,
                      isNonVegOnly: false,
                      isBothVegNonVegOnly: true,
                    }))}
                    className="border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Both Veg & Non-Veg</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}