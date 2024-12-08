import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import AuthPage from './pages/AuthPage';
import TaskPage from './pages/TaskPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>
                                <TaskProvider>
                                    <TaskPage />
                                </TaskProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/auth" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
