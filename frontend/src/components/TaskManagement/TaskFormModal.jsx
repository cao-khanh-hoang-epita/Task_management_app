import React, { useState, useEffect } from 'react';
import '../../styles/TaskFormModal.css';
const TaskFormModal = ({ isOpen, onClose, onSubmit, selectedTask }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Populate fields when editing a task
    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDate(selectedTask.date);
        } else {
            setTitle('');
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [selectedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, date, id: selectedTask?.id }); // Include ID for editing
        setTitle('');
        setDate(new Date().toISOString().split('T')[0]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <h2>{selectedTask ? 'Edit Task' : 'Add Task'}</h2>
                    <label>Task Name:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label>Date Created:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <button type="submit">{selectedTask ? 'Update' : 'Add'}</button>
                    <button type="button" onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskFormModal;
