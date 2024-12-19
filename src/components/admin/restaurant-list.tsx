import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, UtensilsCrossed, MapPin } from 'lucide-react';
import { db } from '../../lib/firebase';
import { Restaurant } from '../../types';
import { RestaurantForm } from './restaurants/restaurant-form';
import { RestaurantCard } from './restaurants/restaurant-card';
import { LocationCard } from './locations/location-card';
import { cities } from '../../data/cities';

const defaultRestaurant: Partial<Restaurant> = {
  restaurantName: '',
  location: '',
  area: '',
  isOpen: true,
  imageUrl: '',
  isVegOnly: false,
  isNonVegOnly: false,
  isBothVegNonVegOnly: true,
};

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);
  const [editingRestaurantId, setEditingRestaurantId] = useState<string | null>(null);
  const [newRestaurant, setNewRestaurant] = useState<Partial<Restaurant>>(defaultRestaurant);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      const restaurantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Restaurant));
      setRestaurants(restaurantsData);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRestaurant = async () => {
    try {
      await addDoc(collection(db, 'restaurants'), newRestaurant);
      setNewRestaurant(defaultRestaurant);
      setIsAddingRestaurant(false);
      fetchRestaurants();
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const handleUpdateRestaurant = async (restaurantId: string, updatedRestaurant: Partial<Restaurant>) => {
    try {
      await updateDoc(doc(db, 'restaurants', restaurantId), updatedRestaurant);
      setEditingRestaurantId(null);
      fetchRestaurants();
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  const handleDeleteRestaurant = async (restaurantId: string) => {
    try {
      await deleteDoc(doc(db, 'restaurants', restaurantId));
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const toggleRestaurantStatus = async (restaurantId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'restaurants', restaurantId), {
        isOpen: !currentStatus,
      });
      fetchRestaurants();
    } catch (error) {
      console.error('Error toggling restaurant status:', error);
    }
  };

  const getRestaurantsByCity = (city: string) => {
    return restaurants.filter(restaurant => 
      restaurant.location.toLowerCase() === city.toLowerCase()
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading restaurants...</div>
      </div>
    );
  }

  const filteredRestaurants = selectedCity 
    ? restaurants.filter(r => r.location.toLowerCase() === selectedCity.toLowerCase())
    : restaurants;

  return (
    <div className="space-y-8">
      {/* Cities Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">Cities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <LocationCard
              key={city.name}
              city={city.name}
              imageUrl={city.imageUrl}
              restaurantCount={getRestaurantsByCity(city.name).length}
              isSelected={selectedCity === city.name}
              onSelect={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
            />
          ))}
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <UtensilsCrossed className="h-6 w-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCity ? `Restaurants in ${selectedCity}` : 'All Restaurants'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} available
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddingRestaurant(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-3 mr-2" />
            Add
          </button>
        </div>

        {/* Add New Restaurant Form */}
        {isAddingRestaurant && (
          <div className="mb-6">
            <RestaurantForm
              restaurant={newRestaurant}
              onSave={handleAddRestaurant}
              onCancel={() => setIsAddingRestaurant(false)}
              onChange={(field, value) => setNewRestaurant(prev => ({ ...prev, [field]: value }))}
              isNew
            />
          </div>
        )}

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id}>
              {editingRestaurantId === restaurant.id ? (
                <RestaurantForm
                  restaurant={restaurant}
                  onSave={() => handleUpdateRestaurant(restaurant.id, restaurant)}
                  onCancel={() => setEditingRestaurantId(null)}
                  onChange={(field, value) => {
                    const updatedRestaurants = restaurants.map(r => 
                      r.id === restaurant.id ? { ...r, [field]: value } : r
                    );
                    setRestaurants(updatedRestaurants);
                  }}
                />
              ) : (
                <RestaurantCard
                  restaurant={restaurant}
                  onEdit={() => setEditingRestaurantId(restaurant.id)}
                  onDelete={() => handleDeleteRestaurant(restaurant.id)}
                  onToggleStatus={() => toggleRestaurantStatus(restaurant.id, restaurant.isOpen)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}