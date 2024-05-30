require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { mysql_uri } = process.env;

// Connect to MongoDB
mongoose.connect(mysql_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./src/api/userRoutes'));
app.use('/api/tasks', require('./src/api/taskRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});