const TaskRepository = require('../repositories/TaskRepository');

class TaskService {
    async getTasks() {
        return await TaskRepository.getAllTasks();
    }

    async getTaskById(id) {
        return await TaskRepository.getTaskById(id);
    }

    async createTask(taskData) {
        return await TaskRepository.createTask(taskData);
    }

    async updateTask(id, updatedData) {
        return await TaskRepository.updateTask(id, updatedData);
    }

    async deleteTask(id) {
        return await TaskRepository.deleteTask(id);
    }
}

module.exports = new TaskService();
