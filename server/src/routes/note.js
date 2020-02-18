const express = require('express');
const Note = require('../models/note');
let router = express.Router();

router.post('/notes', async(req, res) => {
    try {
        const note = await new Note(req.body).save();

        return res.status(200).send(note);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
});

module.exports = router;