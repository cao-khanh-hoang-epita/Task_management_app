import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedPage = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedPage;
