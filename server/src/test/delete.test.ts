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
    const task = {
        title: 'Take out trash'
    }

    await sendAuthRequest('post', '/tasks', task);

    const tasks = await TaskModel.find();
    expect(tasks.length).toBe(1);

    await sendAuthRequest('delete', `/tasks/${tasks[0]._id}`);

    const tasksNew = await TaskModel.find();
    expect(tasksNew.length).toBe(0);
});

test('Delete event', async() => {
    const event = {
        title: 'Got a haircut',
    }

    await sendAuthRequest('post', '/events', event);

    const events = await EventModel.find();
    expect(events.length).toBe(1);

    await sendAuthRequest('delete', `/events/${events[0]._id}`);

    const eventsNew = await EventModel.find();
    expect(eventsNew.length).toBe(0);
});

test('Delete note', async() => {
    const note = {
        title: 'Test note'
    }
    
    await sendAuthRequest('post', '/notes', note);

    const notes = await NoteModel.find();
    expect(notes.length).toBe(1);

    await sendAuthRequest('delete', `/notes/${notes[0]._id}`);

    const notesNew = await NoteModel.find();
    expect(notesNew.length).toBe(0);
});