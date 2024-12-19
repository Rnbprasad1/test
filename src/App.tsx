import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { AdminDashboard } from './components/admin/dashboard';
import { RestaurantDashboard } from './components/restaurant/dashboard';
import { Login } from './components/auth/login';
import { Register } from './components/auth/register';
import { ProtectedRoute } from './components/auth/protected-route';
import { LandingPage } from './components/landing-page';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/*"
            element={
              <ProtectedRoute allowedRole="restaurant_owner">
                <RestaurantDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}