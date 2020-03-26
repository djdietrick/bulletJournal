export {};
const request = require('supertest');
import {App} from '../app';
const BulletModel = require('../models/bullet');
const TaskModel = require('../models/task');
const EventModel = require('../models/event');
const NoteModel = require('../models/note');
const {clearBullets} = require('./fixtures/db');

const app = new App().express;

beforeEach(async() => {
    await clearBullets();
});

afterAll(async() => {
    await clearBullets();
})

test('Delete task', async() => {
    const task = {
        title: 'Take out trash'
    }

    await request(app).post('/tasks')
    .send(task)
    .expect(201);

    const tasks = await TaskModel.find();
    expect(tasks.length).toBe(1);

    await request(app).delete(`/tasks/${tasks[0]._id}`)
    .expect(200);

    const tasksNew = await TaskModel.find();
    expect(tasksNew.length).toBe(0);
});

test('Delete event', async() => {
    const event = {
        title: 'Got a haircut'
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await EventModel.find();
    expect(events.length).toBe(1);

    await request(app).delete(`/events/${events[0]._id}`)
    .expect(200);

    const eventsNew = await EventModel.find();
    expect(eventsNew.length).toBe(0);
});

test('Delete note', async() => {
    const note = {
        title: 'Test note'
    }

    await request(app).post('/notes')
    .send(note)
    .expect(201);

    const notes = await NoteModel.find();
    expect(notes.length).toBe(1);

    await request(app).delete(`/notes/${notes[0]._id}`)
    .expect(200);

    const notesNew = await NoteModel.find();
    expect(notesNew.length).toBe(0);
});