import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>; // Show a loading message while checking user status
    }

    if (!user) {
        return <Navigate to="/auth" />; // Redirect to auth page if not logged in
    }

    return children; // Render the children (protected content) if logged in
};

export default ProtectedRoute;
