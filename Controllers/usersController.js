const mongoose = require('mongoose');
const User = require('../Models/userModels');
const { phoneRegex, emailRegex, passwordRegex } = require('../utils/validationUtils');
const { validate } = require('deep-email-validator');

exports.createUser = async (req, res, next) => {
    try {
        const { userName, email, contactNumber, password, confirmPassword } = req.body;

        // Check for missing required fields
        if (!userName || !email || !contactNumber || !password || !confirmPassword) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Please input all required details.'
                ],
            });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Email already registered. Please choose a different email.'
                ],
            });
        }

        // Validate the email
        const validationResult = await validate(email);
        if (!validationResult.valid) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Invalid email format'
                ],
            });
        }

        // Validate phone number (10 digits)
        if (!phoneRegex.test(contactNumber)) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Contact number must be exactly 10 digits.'
                ],
            });
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.'
                ],
            });
        }

        // Check if passwords match
        if (password != confirmPassword) {
            return res.status(400).json({
                status: 400,
                message: 'Bad Request',
                errorDescription: [
                    'Password Mismatch'
                ],
            });
        }

        // Create a new user
        const newUser = new User({ userName, email, contactNumber, password, confirmPassword });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({
            status: 201,
            message: 'Register successfully',
            responseDto: {
                userName: newUser.userName,
                email: newUser.email,
                contactNumber: newUser.contactNumber,
                // Avoid sending passwords in response
            },
        });

    } catch (error) {
        console.error('Error', error); // Use console.error for error logging
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            errorDescription: [
                'An error occurred while creating the user.'
            ],
        });
        next(error); // Pass the error to the next middleware
    }
};
