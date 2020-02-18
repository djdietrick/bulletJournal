const express = require('express');
const Task = require('../models/task');
let router = express.Router();

router.post('/tasks', async(req, res) => {
    try {
        const task = await new Task(req.body).save();

        return res.status(200).send(task);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
});

module.exports = router;