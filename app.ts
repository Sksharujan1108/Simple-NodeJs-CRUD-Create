import express, { Express } from 'express';
import connectDatabase from './src/dataBase/database'; // Import the database connection
// Import the router
import createUserRoutes from './src/routes/auth/authRoutes';
import sentOtpGmail from './src/routes/auth/authRoutes';
import verifyOtpGmail from './src/routes/auth/authRoutes'

const app: Express = express();

// Middleware, routes, and other configurations
app.use(express.json()); // Example middleware

// Connect to the database
connectDatabase()

app.use('/api/v1', sentOtpGmail); // Prefixing routes with /api/users

app.use('/api/v1', verifyOtpGmail); // Prefixing routes with /api/users

// Use the routes
app.use('/api/v1', createUserRoutes); // Prefixing routes with /api/users


// Export the app instance
export default app;
