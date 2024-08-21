const express = require('express');
const connectDatabase = require('./DataBase/database'); // Import the database connection

const app = express();

// Middleware, routes, and other configurations
app.use(express.json()); // Example middleware

// Import the router
const createUserRoutes = require('./Routes/userRoutes');

// Use the routes
app.use('/api/users', createUserRoutes); // Prefixing routes with /api/users

// Connect to the database
connectDatabase().then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection:', err);
  process.exit(1); // Exit process with failure
});

// Export the app instance
module.exports = app;
