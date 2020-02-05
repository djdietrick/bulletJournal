const mongoose = require('mongoose');

const options =  { 
    collection: 'bullets', 
    discriminatorKey: '_type', 
    timestamps: true}

// Schemas
const bulletSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    notes: [String]
}, options);

const Bullet = mongoose.model('bullet', bulletSchema);

const Task = Bullet.discriminator('task', new mongoose.Schema({
    dueDate: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "InProgress"
    }
}), options);

const Event = Bullet.discriminator('event', new mongoose.Schema({
    eventDate: {
        type: Date,
        required: true,
        index: true,
        default: Date.now
    }
}), options);

const Note = mongoose.model('note', bulletSchema);


module.exports = {Bullet, Task, Event, Note};