const mongoose = require('mongoose');

const connectDB =  () => {
    try {
         mongoose.connect(process.env.CONNECTION_STRING,).then((_)=>{
             console.log("MongoDB connected!");
         });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB;
