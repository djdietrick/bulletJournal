const mongoose = require('mongoose');
const Bullet = require('./bullet');

const Event = Bullet.discriminator('event', new mongoose.Schema({
    eventDate: {
        type: Date,
        required: true,
        index: true,
        default: Date.now
    },
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