const express = require('express');
const Task = require('../models/task');
let router = express.Router();

router.post('/tasks', async(req, res) => {
    try {
        const task = await new Task(req.body).save();

        return res.status(201).send(task);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
});

router.get('/tasks', async(req, res) => {
    const match = {}
    const sort = {}

    // Matches
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.year && req.query.month) {
        match.anchorDate = {
            $gte: new Date(req.query.year, req.query.month, 1),
            $lt: new Date(req.query.year + 1, req.query.month + 1, 1)
        }
    } else {
        return res.status(400).send("Must provide a month and year");
    }

    // Sorts
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
    }

    try {
        const data = await Task.find(match, null, options);

        res.send(data);
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'notes', 'completed', 'dueDate', 'status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
        return res.status(400).send({ 
            error: 'Invalid updates!', 
            invalidUpdates
        })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;