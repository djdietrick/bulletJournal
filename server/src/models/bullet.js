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

module.exports = Bullet;