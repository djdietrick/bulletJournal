export {};
const request = require('supertest');
import {App} from '../app';
const BulletModel = require('../models/bullet');
const TaskModel = require('../models/task');
const EventModel = require('../models/event');
const NoteModel = require('../models/note');
const User = require('../models/user');
const {clearBullets, createUser} = require('./fixtures/db');
const {sendAuthRequest} = require('./fixtures/auth');

const app = new App().express;

beforeEach(async() => {
    await clearBullets();
    await createUser();
});

afterAll(async() => {
    await clearBullets();
})

test('Delete task', async() => {
    const users = await User.find();
    const ownerId = users[0]._id;

    const task = {
        title: 'Take out trash',
        owner: ownerId
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
    const users = await User.find();
    const ownerId = users[0]._id;

    const event = {
        title: 'Got a haircut',
        owner: ownerId
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await EventModel.find();
    expect(events.length).toBe(1);

    await sendAuthRequest('delete', `/events/${events[0]._id}`);

    // await request(app).delete(`/events/${events[0]._id}`)
    // .expect(200);

    const eventsNew = await EventModel.find();
    expect(eventsNew.length).toBe(0);
});

test('Delete note', async() => {
    const users = await User.find();
    const ownerId = users[0]._id;

    const note = {
        title: 'Test note',
        owner: ownerId
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