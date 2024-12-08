import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';


const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin); // Toggle between Login and Signup forms
    };

    return (
        <div className="auth-container">
            <h1>Welcome to Task Manager</h1>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <button className="switch-btn" onClick={toggleForm}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default AuthPage;


