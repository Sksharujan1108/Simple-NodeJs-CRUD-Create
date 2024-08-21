const http = require('http'); // Import the http module
const app = require('./app'); // Import your Express app

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from config.env
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Create an HTTP server with the Express app
const server = http.createServer(app);

// Start the server and listen on the specified port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});