const express = require('express');
const {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskControllers'); // Import the controller functions

const router = express.Router();

// GET /api/tasks - Retrieve all tasks
router.get('/', getTasks);

// POST /api/tasks - Add a new task
router.post('/', addTask);

// PUT /api/tasks/:id - Update a task by ID
router.put('/:id', updateTask);

// DELETE /api/tasks/:id - Delete a task by ID
router.delete('/:id', deleteTask);

module.exports = router;
