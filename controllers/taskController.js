const Task = require('../models/taskSchema');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, category, dueDate, color, notes, miniTasks, tags, recurrence, reminder, attachments } = req.body;
        const userId = req.user.id; // Assuming user is authenticated, and userId is extracted from the token

        const task = new Task({
            title,
            description,
            status,
            priority,
            category,
            dueDate,
            color,
            notes,
            miniTasks,
            tags,
            recurrence,
            reminder,
            attachments,
            assignedTo: userId,
        });

        const savedTask = await task.save();
        return res.status(201).json({ message: 'Task created successfully', task: savedTask });
    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get tasks for a user with optional filters
const getTasks = async (req, res) => {
    try {
        const { filter, category, priority, status } = req.query;
        const userId = req.user.id; // Assuming user is authenticated

        const query = { assignedTo: userId, isDeleted: false };

        if (filter) {
            query.$or = [
                { title: new RegExp(filter, 'i') },
                { description: new RegExp(filter, 'i') },
                { tags: { $regex: filter, $options: 'i' } },
            ];
        }
        if (category) query.category = category;
        if (priority) query.priority = priority;
        if (status) query.status = status;

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        return res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findOne({ _id: taskId, assignedTo: req.user.id, isDeleted: false });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ task });
    } catch (error) {
        console.error('Error fetching task:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updates = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, assignedTo: req.user.id },
            { $set: updates },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not owned by user' });
        }

        return res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Delete a task by ID (soft delete)
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, assignedTo: req.user.id },
            { $set: { isDeleted: true } },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not owned by user' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
