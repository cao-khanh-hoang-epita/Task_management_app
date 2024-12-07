import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';

const CompletedList = () => {
    const { completedTasks } = useTaskContext();

    if (completedTasks.length === 0) {
        return <p>No completed tasks yet.</p>;
    }

    return (
        <ul>
            {completedTasks.map((task) => (
                <li key={task.id}>
                    <strong>{task.title}</strong> - {task.date}
                </li>
            ))}
        </ul>
    );
};

export default CompletedList;
