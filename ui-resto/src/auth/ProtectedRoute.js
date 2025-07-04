import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('jwt_token');

    // Jika ada token, tampilkan komponen (HalamanAdmin). Jika tidak, arahkan ke login.
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;