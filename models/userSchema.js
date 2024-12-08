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
        resetPasswordToken: {
            type: String,
            default: null,
        },
        resetPasswordExpires: {
            type: Date,
            default: null,
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

// // Middleware to hash passwords before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });
//
// // Method to compare passwords
// userSchema.methods.comparePassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
