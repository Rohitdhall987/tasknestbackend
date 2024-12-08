const User=require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Utility function to validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


const createUser = async (req, res) => {
    const { name, email, password } = req.query;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT) || 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevent JavaScript access (XSS protection)
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        });

        return res.json({
            message: 'New user created successfully.',
            userData: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Send token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });

        const { password: _, ...userData } = user.toObject(); // Exclude password from response

        return res.json({ message: 'Login successful.', userData });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};


module.exports = {createUser,loginUser};