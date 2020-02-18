const express = require('express');
const Event = require('../models/event');
let router = express.Router();

router.post('/events', async(req, res) => {
    try {
        const event = await new Event(req.body).save();

        return res.status(200).send(event);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
});

module.exports = router;