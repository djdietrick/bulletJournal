const express = require('express');
const Event = require('../models/event');
let router = express.Router();

router.post('/events', async(req, res) => {
    try {
        const evnt = await new Event(req.body).save();

        return res.status(201).send(evnt);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
});

router.get('/events', async(req, res) => {
    const match = {}
    const sort = {}

    // Matches
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
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
        const data = await Event.find(match, null, options);

        res.send(data);
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/events/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const evnt = await Event.findOne({ _id });

        if (!evnt) {
            return res.status(404).send();
        }

        res.send(evnt);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/events/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'notes', 'eventDate', 'allDay', 'importance'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
        return res.status(400).send({ 
            error: 'Invalid updates!', 
            invalidUpdates
        })
    }

    try {
        const evnt = await Event.findOne({ _id: req.params.id})

        if (!evnt) {
            return res.status(404).send()
        }

        updates.forEach((update) => evnt[update] = req.body[update])
        await evnt.save()
        res.send(evnt)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const evnt = await Event.findOneAndDelete({ _id: req.params.id})

        if (!evnt) {
            res.status(404).send()
        }

        res.send(evnt)
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;