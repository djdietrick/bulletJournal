const mongoose = require('mongoose');
const Bullet = require('./bullet');

const Event = Bullet.discriminator('event', new mongoose.Schema({
    allDay: {
        type: Boolean,
        default: false
    },
    importance: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    }
}));

module.exports = Event;