const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        // Basic User Information
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },

        // Profile Customization
        avatar: {
            type: String, // URL for the user's profile picture
            default: '', // Can be updated later
        },
        theme: {
            type: String, // Preferred theme (e.g., "light", "dark")
            default: 'light',
        },

        // Task Customization
        defaultTaskColor: {
            type: String, // Hex color code for tasks by default
            default: '#ffffff',
        },

        // Account Management
        isVerified: {
            type: Boolean,
            default: false, // Email verification flag
        },
        // App Features
        preferences: {
            notifications: {
                type: Boolean, // Enable or disable notifications
                default: true,
            },
        },

        // Metadata
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
