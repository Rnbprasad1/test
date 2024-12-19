import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'admin' | 'restaurant_owner';
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role === 'admin' ? 'admin' : 'restaurant'}`} replace />;
  }

  return <>{children}</>;
}