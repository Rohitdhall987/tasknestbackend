const express = require('express');
const taskRouter = require("./routes/tasks");
const userRouter = require("./routes/user");
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const jwt_authenticate=require('./middlewares/jwt_check');
require('dotenv').config();




const app=express();

const port = process.env.PORT;

 connectDB();

app.use(bodyParser.json());

app.use('/user', userRouter);

app.use(jwt_authenticate);
app.use('/tasks', taskRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})