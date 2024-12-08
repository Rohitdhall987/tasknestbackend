const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        // Basic Fields
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
        },

        // Priority & Categorization
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        category: {
            type: String,
            default: 'General',
        },

        // Dates and Deadlines
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
        },

        // Task Customization
        color: {
            type: String, // Hex color code or CSS-friendly color value
            default: '#ffffff', // Default color is white
        },

        // Notes
        notes: {
            type: String, // Additional user notes for the task
            trim: true,
        },

        // Mini Tasks (Subtasks)
        miniTasks: [
            {
                title: { type: String, required: true },
                status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
            },
        ],

        // Collaboration (Sharing Tasks)
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to a User model for collaboration
        },
        sharedWith: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        // Repeating and Recurring Tasks
        recurrence: {
            type: String,
            enum: ['none', 'daily', 'weekly', 'monthly'],
            default: 'none',
        },

        // Notifications and Reminders
        reminder: {
            type: Date,
        },

        // Additional Metadata
        tags: {
            type: [String], // Array of tags for better organization and search
        },
        attachments: [
            {
                url: { type: String }, // URL of the attached file
                name: { type: String }, // File name
            },
        ],

        // Soft Delete (Optional)
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
