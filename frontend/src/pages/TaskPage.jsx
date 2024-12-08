import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskManagement/TaskList';
import CompletedList from '../components/TaskManagement/CompletedList';
import TaskFormModal from '../components/TaskManagement/TaskFormModal';
import SearchBar from '../components/TaskManagement/SearchBar';
import '../styles/TaskPage.css';

const TaskPage = () => {
    const {
        tasks,
        completedTasks,
        addTask,
        editTask,
        removeTask,
        toggleCompletion,
        searchTasks,
    } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [selectedTask, setSelectedTask] = useState(null);

    const navigate = useNavigate();

    const handleSearch = (query) => {
        const results = searchTasks(query);
        setFilteredTasks(results);
    };

    const handleAddTask = (task) => {
        if (selectedTask) {
            editTask(selectedTask._id, task);
        } else {
            addTask(task);
        }
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/auth');
    };

    return (
        <div className="task-page">
            <header className="task-header">
                <h1>Task Management</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <SearchBar onSearch={handleSearch} />
            <button
                className="add-task-btn"
                onClick={() => {
                    setSelectedTask(null);
                    setIsModalOpen(true);
                }}
            >
                Add Task
            </button>
            <TaskFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTask}
                selectedTask={selectedTask}
            />
            <h2>Active Tasks</h2>
            <TaskList
                tasks={filteredTasks.length ? filteredTasks : tasks}
                onEdit={handleEdit}
                onToggleCompletion={toggleCompletion}
            />
            <h2>Completed Tasks</h2>
            <CompletedList tasks={completedTasks} />
        </div>
    );
};

export default TaskPage;
