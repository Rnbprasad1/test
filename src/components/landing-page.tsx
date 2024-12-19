import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Store, ChefHat } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';

export function LandingPage() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/restaurant'} replace />;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Welcome to Chelto Restaurant Management System
        </h1>
        <p className="text-xl text-gray-600">
          Manage your restaurant or explore local dining options with our comprehensive platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Store className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Restaurant Owners</h2>
            <p className="text-gray-600 mb-4">
              Register your restaurant and manage your menu, orders and more
            </p>
            <Link
              to="/register"
              className="block w-full bg-indigo-600 text-white rounded-md px-4 py-2 text-center hover:bg-indigo-700 transition-colors"
            >
              Register Now
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ChefHat className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Already Registered?</h2>
            <p className="text-gray-600 mb-4">
              Sign in to access your dashboard and manage your restaurant
            </p>
            <Link
              to="/login"
              className="block w-full bg-indigo-600 text-white rounded-md px-4 py-2 text-center hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}