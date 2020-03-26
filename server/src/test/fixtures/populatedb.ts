export {};
const bullets = require('./testBullets.json');
const EventModel = require('../../models/event');
const TaskModel = require('../../models/task');
const NoteModel = require('../../models/note');

// connect to db
require('../../../db/mongoose');

const populatedb = async() => {
    try {
        for(let [importance, events] of Object.entries<Array<any>>(bullets.events)) {
            for(let event of events) {
                event.importance = importance;
                await new EventModel(event).save();
            }
        }

        // Load tasks
        for(let i = 0; i < bullets.tasks.length; i++) {
            await new TaskModel(bullets.tasks[i]).save();
        }

        // Load notes
        for(let i = 0; i < bullets.notes.length; i++) {
            await new NoteModel(bullets.notes[i]).save();
        }
        console.log("Populated database with test data");
    } catch(e) {
        console.error(e.message);
    }
}

populatedb();