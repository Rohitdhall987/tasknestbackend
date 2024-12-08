const express = require('express');

const router=express.Router();

router.get('/all/:filter', (req ,res) => {
    const filter=req.params.filter;
    res.json({message:`sending task with filter ${filter}`});
});

router.post('/add', (req ,res) => {
    res.json({message:`add task`});
})

router.route('/:taskId').get((req ,res) => {

    res.json({message:`sending task with id ${req.params.taskId}`});

}).put((req ,res) => {

    res.json({message:`updating task with id ${req.params.taskId}`});

}).delete((req ,res) => {
    res.json({message:`deleting task with id ${req.params.taskId}`});
});

module.exports = router;