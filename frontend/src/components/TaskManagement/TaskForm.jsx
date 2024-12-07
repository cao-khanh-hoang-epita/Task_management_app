import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';

const TaskForm = ({ selectedTask, clearSelection }) => {
    const { addTask, editTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [selectedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedTask) {
            editTask({ ...selectedTask, title, description });
        } else {
            addTask({ title, description });
        }
        clearSelection();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
            {selectedTask && <button onClick={clearSelection}>Cancel</button>}
        </form>
    );
};

export default TaskForm;
