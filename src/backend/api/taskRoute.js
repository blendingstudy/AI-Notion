// src/api/taskRoutes.js
const express = require('express');
const router = express.Router();
const { createTask, getTasksByUserId, updateTask, deleteTask } = require('../controllers/taskController');

// Create a new task
router.post('/', createTask);

// Retrieve tasks by user id
router.get('/user/:userId', getTasksByUserId);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
