import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center flex-shrink-0">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900 hidden sm:block">
              Chelto Dashboard
              </span>
            </div>

            {/* Mobile menu button */}
            {user && (
              <div className="flex items-center sm:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            )}

            {/* Desktop menu */}
            {user && (
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {user && isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <div className="px-3 py-2 text-sm text-gray-700">
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}