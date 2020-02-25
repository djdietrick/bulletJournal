const Bullet = require('../../models/bullet');
// const Task = require('../models/task');
// const Event = require('../models/event');
// const Note = require('../models/note');
const bullets = require('./testBullets.json');
const app = require('../../app');
const request = require('supertest');

const clearBullets = async () => {
    await Bullet.deleteMany();
}

const loadBullets = async() => {
    // Load events
    try {
        for(let [importance, events] of Object.entries(bullets.events)) {
            for(let event of events) {
                event.importance = importance;
                await request(app).post('/events').send(event);
            }
        }

        // Load tasks
        for(let i = 0; i < bullets.tasks.length; i++) {
            await request(app).post('/tasks').send(bullets.tasks[i]);
        }

        // Load notes
        for(let i = 0; i < bullets.notes.length; i++) {
            await request(app).post('/notes').send(bullets.notes[i]);
        }
    } catch(e) {
        console.error(e.message);
    }
}

module.exports = {
    clearBullets,
    loadBullets
}