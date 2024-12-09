const express = require('express');
const {createTask, getTasks, getTaskById, updateTask, deleteTask}=require('../controllers/taskController');

const router=express.Router();

router.get('/all', getTasks);

router.post('/add', createTask)

router.route('/details/:taskId').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;