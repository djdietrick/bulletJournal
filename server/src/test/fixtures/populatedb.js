const bullets = require('./testBullets.json');
const Event = require('../../models/event');
const Task = require('../../models/task');
const Note = require('../../models/note');

// connect to db
require('../../../db/mongoose');

const populatedb = async() => {
    try {
        for(let [importance, events] of Object.entries(bullets.events)) {
            for(let event of events) {
                event.importance = importance;
                await new Event(event).save();
            }
        }

        // Load tasks
        for(let i = 0; i < bullets.tasks.length; i++) {
            await new Task(bullets.tasks[i]).save();
        }

        // Load notes
        for(let i = 0; i < bullets.notes.length; i++) {
            await new Note(bullets.notes[i]).save();
        }
    } catch(e) {
        console.error(e.message);
    }
}

populatedb();