import express, { Express } from 'express';
import connectDatabase from './src/dataBase/database'; // Import the database connection

const app: Express = express();

// Middleware, routes, and other configurations
app.use(express.json()); // Example middleware

// Import the router
import createUserRoutes from './src/routes/userRoutes';

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
export default app;
