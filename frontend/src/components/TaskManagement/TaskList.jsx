import React, { useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import ConfirmModal from './ConfirmModal';

const TaskList = ({ onEdit }) => {
    const { tasks, removeTask, toggleCompletion } = useTaskContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [action, setAction] = useState(''); // 'delete' or 'edit'

    if (!tasks || tasks.length === 0) {
        return <p>No tasks available. Add some tasks!</p>;
    }

    const openModal = (task, actionType) => {
        setCurrentTask(task);
        setAction(actionType);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (action === 'delete') {
            removeTask(currentTask._id); // Assuming tasks use `_id` as a key
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
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id} className="task-item">
                        <div className="task-info">
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleCompletion(task._id, !task.isCompleted)}
                            />
                            <span className={task.isCompleted ? 'completed' : ''}>
                                {task.title}
                            </span>
                            <span className="task-date">{new Date(task.date).toLocaleDateString()}</span>
                        </div>
                        <div className="task-actions">
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
            {isModalOpen && (
                <ConfirmModal
                    isOpen={isModalOpen}
                    message={`Are you sure you want to ${action} this task?`}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default TaskList;
