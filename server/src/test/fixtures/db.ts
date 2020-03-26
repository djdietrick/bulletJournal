export {};
const bullets = require('./testBullets.json');
const request = require('supertest');
const BulletModel = require('../../models/bullet');
import {App} from '../../app';

const app = new App().express;

const clearBullets = async () => {
    await BulletModel.deleteMany();
}

const loadBullets = async() => {
    // Load events
    try {
        for(let [importance, events] of Object.entries<Array<any>>(bullets.events)) {
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