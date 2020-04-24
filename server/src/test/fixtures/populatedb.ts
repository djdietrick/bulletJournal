export {};
const bullets = require('./testBullets.json');
const EventModel = require('../../models/event');
const TaskModel = require('../../models/task');
const NoteModel = require('../../models/note');
const User = require('../../models/user');

// connect to db
require('../../db/mongoose');

const populatedb = async() => {
    const user = await new User({
        name: "David Dietrick",
        email: "djdietrick@gmail.com",
        password: "password"
    }).save();

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
        console.log("Populated database with test data");
    } catch(e) {
        console.error(e.message);
    }
}

populatedb();