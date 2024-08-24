import express, { Express } from 'express';
import connectDatabase from './src/dataBase/database'; // Import the database connection
// Import the router
import authModel from './src/routes/auth/authRoutes';


const app: Express = express();

// Middleware, routes, and other configurations
app.use(express.json()); // Example middleware

// Connect to the database
connectDatabase()

app.use('/api/v1', authModel); // Prefixing routes with /api/users


// Export the app instance
export default app;
