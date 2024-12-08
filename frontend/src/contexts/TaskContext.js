import React, { createContext, useState, useEffect } from 'react';
import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
} from '../api/taskApi';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error.message);
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, []);

    const completedTasks = tasks.filter((task) => task.isCompleted);

    const searchTasks = (query) => {
        if (!query) return tasks;
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    };

    const addTask = async (taskData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error('Failed to add task:', error.message);
        }
    };

    const editTask = async (taskId, updatedTask) => {
        try {
            const updated = await updateTask(taskId, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === taskId ? updated : task))
            );
        } catch (error) {
            console.error('Failed to edit task:', error.message);
        }
    };

    const removeTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error('Failed to delete task:', error.message);
        }
    };

    const toggleCompletion = async (taskId, isCompleted) => {
        try {
            const updated = await toggleTaskCompletion(taskId, isCompleted);
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task._id === taskId ? updated : task))
            );
        } catch (error) {
            console.error('Failed to toggle task completion:', error.message);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                completedTasks,
                loading,
                searchTasks,
                addTask,
                editTask,
                removeTask,
                toggleCompletion,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => React.useContext(TaskContext);
