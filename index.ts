import http from 'http'; // Import the http module
import app from './app'; // Import your Express app

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Create an HTTP server with the Express app
const server = http.createServer(app);

// Start the server and listen on the specified port
const PORT: number = Number(process.env.PORT) || 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
