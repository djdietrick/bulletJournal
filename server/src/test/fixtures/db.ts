export {};
const bullets = require('./testBullets.json');
const request = require('supertest');
const BulletModel = require('../../models/bullet');
const EventModel = require('../../models/event');
const TaskModel = require('../../models/task');
const NoteModel = require('../../models/note');
const User = require('../../models/user');
import {App} from '../../app';

const app = new App().express;

const clearBullets: Function = async () => {
    await BulletModel.deleteMany();
    await User.deleteMany();
}

const createUser: Function = async () => {
    await new User({
        name: "David Dietrick",
        email: "djdietrick@gmail.com",
        password: "password"
    }).save();
}

const loadBullets: Function = async() => {
    await createUser();
    const users = await User.find();
    const user = users[0];

    // Load events
    try {
        for(let [importance, events] of Object.entries<Array<any>>(bullets.events)) {
            for(let event of events) {
                event.importance = importance;
                event.owner = user._id;
                await new EventModel(event).save();
            }
        }

        // Load tasks
        for(let i = 0; i < bullets.tasks.length; i++) {
            let task = bullets.tasks[i];
            task.owner = user._id;
            await new TaskModel(task).save();
        }

        // Load notes
        for(let i = 0; i < bullets.notes.length; i++) {
            let note = bullets.notes[i];
            note.owner = user._id;
            await new NoteModel(note).save();
        }
    } catch(e) {
        console.error(e.message);
    }
}

module.exports = {
    clearBullets,
    loadBullets,
    createUser
}