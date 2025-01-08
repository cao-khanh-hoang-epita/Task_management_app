import axios from 'axios';

const API_URL = 'https://task-management-app-mhpk.onrender.com/api/auth'; // Correct backend URL

export const signup = async (email, password) => {
    console.log('Sending signup request to backend...');
    const response = await axios.post(`${API_URL}`, { email, password });
    console.log('Signup response:', response.data); // Log backend response
    return response.data;
};

export const login = async (email, password) => {
    console.log('Sending login request to backend...');
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log('Login response:', response.data); // Log backend response
    return response.data;
};
