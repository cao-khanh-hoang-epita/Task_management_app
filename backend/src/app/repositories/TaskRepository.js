const Task = require('../models/Task');

class TaskRepository {
    async getAllTasks() {
        return await Task.find();
    }

    async getTaskById(id) {
        return await Task.findById(id);
    }

    async createTask(taskData) {
        const task = new Task(taskData);
        return await task.save();
    }

    async updateTask(id, updatedData) {
        return await Task.findByIdAndUpdate(id, updatedData, { new: true });
    }

    async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }
}

module.exports = new TaskRepository();
