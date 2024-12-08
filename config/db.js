const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING,);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
