import * as mongoose from 'mongoose';
const Bullet = require('./bullet');

// TODO : account for multiple day events
const Event = Bullet.discriminator('event', new mongoose.Schema({
    allDay: {
        type: Boolean,
        default: false
    },
    location: {
        type: String
    },
    endDate: {
        type: Date
    },
    importance: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    }
}));

module.exports = Event;