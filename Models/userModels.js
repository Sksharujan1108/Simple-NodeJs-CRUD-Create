const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        default: null
    },
    contactNumber: {
        type: String,
        required: true,
        default: null
    },
    password: {
        type: String,
        required: true,
        default: null
    },
    confirmPassword: {
        type: String,
        required: true,
        default: null
    },
})

const User = mongoose.model('user', UserSchema);

module.exports = User;