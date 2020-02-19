const express = require('express');
const Note = require('../models/note');
let router = express.Router();

router.post('/notes', async(req, res) => {
    try {
        const note = await new Note(req.body).save();

        return res.status(201).send(note);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
});

router.get('/notes', async(req, res) => {
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
        const data = await Note.find(match, null, options);

        res.send(data);
    } catch(e) {
        res.status(500).send();
    }
});

router.get('/notes/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const note = await Note.findOne({ _id });

        if (!note) {
            return res.status(404).send();
        }

        res.send(note);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/notes/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'notes'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
        return res.status(400).send({ 
            error: 'Invalid updates!', 
            invalidUpdates
        })
    }

    try {
        const note = await Notes.findOne({ _id: req.params.id})

        if (!note) {
            return res.status(404).send()
        }

        updates.forEach((update) => note[update] = req.body[update])
        await note.save()
        res.send(note)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id})

        if (!note) {
            res.status(404).send()
        }

        res.send(note)
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;