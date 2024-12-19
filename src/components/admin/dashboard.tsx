import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutGrid, UtensilsCrossed, Tag, Image } from 'lucide-react';
import { RestaurantList } from './restaurant-list';
import { ProductList } from './product-list';
import { CategoriesManagement } from './categories';
import { ImagesManagement } from './images';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/restaurants"
            className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <UtensilsCrossed className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Restaurants</h2>
              <p className="text-sm text-gray-500">Manage all restaurants</p>
            </div>
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <LayoutGrid className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Products</h2>
              <p className="text-sm text-gray-500">Manage grocery products</p>
            </div>
          </Link>
          <Link
            to="/admin/categories"
            className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Tag className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              <p className="text-sm text-gray-500">Manage product categories</p>
            </div>
          </Link>
          <Link
            to="/admin/images"
            className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <Image className="h-6 w-6 text-indigo-600 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Images</h2>
              <p className="text-sm text-gray-500">Manage image library</p>
            </div>
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/categories" element={<CategoriesManagement />} />
        <Route path="/images" element={<ImagesManagement />} />
      </Routes>
    </div>
  );
}