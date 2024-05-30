// src/controllers/taskController.js
const TaskModel = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const { userId, description, status } = req.body;
    const result = await TaskModel.create(userId, description, status);
    res.status(201).json({ message: 'Task created', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

exports.getTasksByUserId = async (req, res) => {
  try {
    const tasks = await TaskModel.findByUserId(req.params.userId);
    if (tasks.length > 0) {
      res.status(200).json(tasks);
    } else {
      res.status(404).json({ message: 'No tasks found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { description, status } = req.body;
    const result = await TaskModel.update(req.params.id, description, status);
    res.status(200).json({ message: 'Task updated', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await TaskModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
