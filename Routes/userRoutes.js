const express = require('express');
const router = express.Router()

// Import the createUser function from the controller
const { createUser } = require('../Controllers/usersController');

// Define the route and use createUser as the handler
router.route('/createUsers').post(createUser);

module.exports = router; // Ensure correct export statement