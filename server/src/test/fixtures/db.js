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

        // bullets.events.forEach(async (events, importance, map) => {
        //     events.forEach(async (event) => {
        //         const newEvent = {
        //             ...event,
        //             importance
        //         }
        //         await request(app).post('/events').send(newEvent);
        //     });
        // });
        for(let i = 0; i < bullets.events.HIGH.length; i++) {
            const event = {
                ...bullets.events.HIGH[i],
                importance: "HIGH"
            }
            await request(app).post('/events').send(event);
        }
        for(let i = 0; i < bullets.events.MEDIUM.length; i++) {
            const event = {
                ...bullets.events.MEDIUM[i],
                importance: "MEDIUM"
            }
            await request(app).post('/events').send(event);
        }
        for(let i = 0; i < bullets.events.LOW.length; i++) {
            const event = {
                ...bullets.events.LOW[i],
                importance: "LOW"
            }
            await request(app).post('/events').send(event);
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