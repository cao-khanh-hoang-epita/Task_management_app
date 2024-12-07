import React, { useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import ConfirmModal from './ConfirmModal';

const TaskList = ({ onEdit }) => {
    const { tasks, deleteTask, completeTask } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [action, setAction] = useState(''); // 'delete' or 'edit'

    if (tasks.length === 0) {
        return <p>No tasks available. Add some tasks!</p>;
    }

    const openModal = (task, actionType) => {
        setCurrentTask(task);
        setAction(actionType);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (action === 'delete') {
            deleteTask(currentTask.id);
        } else if (action === 'edit') {
            onEdit(currentTask);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            onChange={() => completeTask(task.id)}
                        />
                        <strong>{task.title}</strong> - {task.date}
                        <div>
                            <button
                                onClick={() => openModal(task, 'edit')}
                                className="edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => openModal(task, 'delete')}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <ConfirmModal
                isOpen={isModalOpen}
                message={`Are you sure you want to ${action} this task?`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
};

export default TaskList;
