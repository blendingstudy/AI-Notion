// src/api/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// Create a new user
router.post('/', createUser);

// Retrieve a user by id
router.get('/:id', getUserById);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;
