import React from 'react';

const CompletedList = ({ tasks = [] }) => {
    if (tasks.length === 0) {
        return <p>No completed tasks yet!</p>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    <strong>{task.title}</strong> - {new Date(task.date).toLocaleDateString()}
                </li>
            ))}
        </ul>
    );
};

export default CompletedList;
