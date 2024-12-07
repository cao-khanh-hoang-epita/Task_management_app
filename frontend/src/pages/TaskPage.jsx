import React, { useState } from 'react';
import { TaskProvider, useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskManagement/TaskList';
import CompletedList from '../components/TaskManagement/CompletedList';
import TaskFormModal from '../components/TaskManagement/TaskFormModal';
import SearchBar from '../components/TaskManagement/SearchBar';
import '../styles/TaskPage.css'

const TaskPageContent = () => {
    const { tasks, completedTasks, addTask, editTask, searchTasks } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleSearch = (query) => {
        setFilteredTasks(searchTasks(query));
    };

    const handleEdit = (task) => {
        setSelectedTask(task); // Set the task to edit
        setIsModalOpen(true); // Open the modal
    };

    const handleAddTask = (task) => {
        if (selectedTask) {
            editTask(task); // Edit the selected task
        } else {
            addTask(task); // Add a new task
        }
        setSelectedTask(null); // Clear selection after submission
    };

    return (
        <div className="task-page">
            <h1>Task Management</h1>
            <SearchBar onSearch={handleSearch} />
            <button
                onClick={() => {
                    setSelectedTask(null); // Clear selected task
                    setIsModalOpen(true); // Open modal for adding a new task
                }}
            >
                Add Task
            </button>
            <TaskFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
                selectedTask={selectedTask} // Pass selected task to modal
            />
            <h2>Active Tasks</h2>
            <TaskList onEdit={handleEdit} />
            <h2>Completed Tasks</h2>
            <CompletedList />
        </div>
    );
};

const TaskPage = () => (
    <TaskProvider>
        <TaskPageContent />
    </TaskProvider>
);

export default TaskPage;