import * as mongoose from 'mongoose';
const Bullet = require('./bullet');

const Task = Bullet.discriminator('task', new mongoose.Schema({
    dueDate: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["IN_PROGRESS", "COMPLETED", "NAN"],
        default: "IN_PROGRESS"
    }
}));

module.exports = Task;