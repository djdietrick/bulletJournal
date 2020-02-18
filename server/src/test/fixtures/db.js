const Bullet = require('../../models/bullet');
// const Task = require('../models/task');
// const Event = require('../models/event');
// const Note = require('../models/note');

const clearBullets = async () => {
    await Bullet.deleteMany();
}

module.exports = {
    clearBullets
}