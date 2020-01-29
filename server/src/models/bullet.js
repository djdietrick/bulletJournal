const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');

const bulletSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    date: {
        type: Date,
    }
}, { collection: 'bullets', discriminatorKey: '_type', timestamps: true});

const taskSchema = bulletSchema.extend({

});

const eventSchema = bulletSchema.extend({

});

const noteSchema = bulletSchema.extend({

});

// Statics and methods

const Bullet = mongoose.model('bullet', bulletSchema);
const Task = mongoose.model('task', taskSchema);
const Event = mongoose.model('event', eventSchema);
const Note = mongoose.model('note', noteSchema);

module.exports = {Bullet, Task, Event, Note};