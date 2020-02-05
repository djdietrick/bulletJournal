const express = require('express');
const {Bullet, Task, Event, Note} = require('../models/bullet');
let router = express.Router();

// Create routes
router.post('/create/tasks', async(req, res) => {
    try {
        const task = await new Task(req.body).save();

        return res.status(200).send(task);
    } catch(e) {
        return res.status(400).send(e.message);
    }
});

router.post('/create/events', async(req, res) => {
    try {
        const event = await new Event(req.body).save();

        return res.status(200).send(event);
    } catch(e) {
        return res.status(400).send(e.message);
    }
});

router.post('/create/notes', async(req, res) => {
    try {
        const note =  await new Note(req.body).save();

        return res.status(200).send(note);
    } catch(e) {
        return res.status(400).send(e.message);
    }
});

// Retrieve routes

// Update routes

router.put('/:id/update', async(req, res) => {
    try {
        let updatedBullet = await Bullet.findByIdAndUpdate(req.params.id, {$set: req.body});
        return res.send(updatedBullet);
    } catch(err) {
        return res.status(400).send(err);
    }
});

// Delete routes
router.put('/:id/update', async(req, res) => {
    try {
        await Bullet.findByIdAndRemove(req.params.id);
        return res.send();
    } catch(err) {
        return res.status(400).send(err);
    }
});

module.exports = router;