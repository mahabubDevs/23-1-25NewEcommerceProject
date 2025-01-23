const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin', 'manager','seller']
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    created_at: {
        type: Date,
        default: Date.now
    }   
});

module.exports = mongoose.model('User', userSchema);