const express = require('express');
const router = express.Router();
const Bullet = require('../models/bullet');

router.delete("/:id", async(req, res) => {
    try {
        const bullet = await Bullet.findOneAndDelete({ _id: req.params.id});

        if (!bullet) {
            res.status(404).send();
        }

        res.send(bullet);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;