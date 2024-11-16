import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, role, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}