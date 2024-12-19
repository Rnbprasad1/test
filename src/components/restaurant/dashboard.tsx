import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth-store';
import { RestaurantProfile } from './restaurant-profile';
import { MenuManagement } from './menu-management';
import { Store, Menu } from 'lucide-react';

export function RestaurantDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Restaurant Dashboard
        </h1>
        <p className="text-gray-600 mb-4">Welcome, {user?.email}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/restaurant"
            className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Store className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Restaurant Profile</h2>
              <p className="text-sm text-gray-500">Manage your restaurant details</p>
            </div>
          </Link>
          <Link
            to="/restaurant/menu"
            className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Menu className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Menu Management</h2>
              <p className="text-sm text-gray-500">Manage your menu items</p>
            </div>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<RestaurantProfile />} />
        <Route path="/menu" element={<MenuManagement />} />
      </Routes>
    </div>
  );
}