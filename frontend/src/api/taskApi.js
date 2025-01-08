import axios from 'axios';

const API_URL = 'https://task-management-app-mhpk.onrender.com/api/tasks'; // Update with your backend URL

// Get all tasks
export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add a new task
export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

// Update a task
export const updateTask = async (taskId, updatedTask) => {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response.data;
};

// Mark a task as completed (or undone)
export const toggleTaskCompletion = async (taskId, isCompleted) => {
    const response = await axios.put(`${API_URL}/${taskId}`, { isCompleted });
    return response.data;
};
