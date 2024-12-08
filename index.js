const express = require('express');
const taskRouter = require("./routes/tasks");
const userRouter = require("./routes/user");
const connectDB = require('./config/db');
require('dotenv').config();
const app=express();

const port = process.env.PORT;
connectDB();

app.use('/tasks', taskRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})