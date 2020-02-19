const request = require('supertest');
const path = require('path');
const app = require('../app');
const Bullet = require('../models/bullet');
const Task = require('../models/task');
const Event = require('../models/event');
const Note = require('../models/note');
const {clearBullets} = require('./fixtures/db');

beforeEach(async() => {
    await clearBullets();
});

test('Delete task', async() => {
    const task = {
        title: 'Take out trash'
    }

    await request(app).post('/tasks')
    .send(task)
    .expect(201);

    const tasks = await Task.find();
    expect(tasks.length).toBe(1);

    await request(app).delete(`/tasks/${tasks[0]._id}`)
    .expect(200);

    const tasksNew = await Task.find();
    expect(tasksNew.length).toBe(0);
});

test('Delete event', async() => {
    const event = {
        title: 'Got a haircut'
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await Event.find();
    expect(events.length).toBe(1);

    await request(app).delete(`/events/${events[0]._id}`)
    .expect(200);

    const eventsNew = await Event.find();
    expect(eventsNew.length).toBe(0);
});

test('Delete note', async() => {
    const note = {
        title: 'Test note'
    }

    await request(app).post('/notes')
    .send(note)
    .expect(201);

    const notes = await Note.find();
    expect(notes.length).toBe(1);

    await request(app).delete(`/notes/${notes[0]._id}`)
    .expect(200);

    const notesNew = await Note.find();
    expect(notesNew.length).toBe(0);
});