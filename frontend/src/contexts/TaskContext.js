import React, { createContext, useState, useContext } from 'react';

// Create the context
const TaskContext = createContext();

// Provide the context
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]); // Active tasks
    const [completedTasks, setCompletedTasks] = useState([]); // Completed tasks

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now(), isCompleted: false }]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const editTask = (updatedTask) => {
        setTasks(
            tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const completeTask = (id) => {
        const taskToComplete = tasks.find((task) => task.id === id);
        if (taskToComplete) {
            setTasks(tasks.filter((task) => task.id !== id));
            setCompletedTasks([...completedTasks, { ...taskToComplete, isCompleted: true }]);
        }
    };

    const searchTasks = (query) => {
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                completedTasks,
                addTask,
                deleteTask,
                editTask,
                completeTask,
                searchTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// Export the hook for accessing the context
export const useTaskContext = () => useContext(TaskContext);
