export {}
const {clearBullets} = require("./fixtures/db");
const request = require('supertest');
const BulletModel = require('../models/bullet');
const TaskModel = require('../models/task');
const EventModel = require('../models/event');
const NoteModel = require('../models/note');
import {App} from '../app';
const moment = require('moment');

const app = new App().express;

beforeEach(async() => {
    await clearBullets();
});

afterAll(async() => {
    await clearBullets();
})

test('Create task', async() => {
    const task = {
        title: 'Take out trash'
    }

    await request(app).post('/tasks')
    .send(task)
    .expect(201);

    const tasks = await BulletModel.find();
    expect(tasks.length).toBe(1);

    const taskSpec = await TaskModel.find();
    expect(taskSpec.length).toBe(1);

    const newTask = tasks[0];
    expect(newTask.title).toBe('Take out trash');
    expect(newTask.description).toBeUndefined();
    expect(newTask.anchorDate).toBeDefined();
    expect(newTask.notes.length).toBe(0);
    expect(newTask.dueDate).toBeUndefined();
    expect(newTask.completed).toBe(false);
    expect(newTask.status).toBe('IN_PROGRESS');
});

test('Create task with due date', async() => {
    const task = {
        title: 'Take out trash',
        dueDate: '2020-02-20T00:00:00'
    }

    await request(app).post('/tasks')
    .send(task)
    .expect(201);

    const tasks = await BulletModel.find();
    expect(tasks.length).toBe(1);

    const newTask = tasks[0];
    expect(newTask.dueDate.toDateString()).toBe('Thu Feb 20 2020');
});

test('Create event', async() => {
    const event = {
        title: 'Got a haircut'
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await BulletModel.find();
    expect(events.length).toBe(1);

    const eventSpec = await EventModel.find();
    expect(eventSpec.length).toBe(1);

    const date = moment();
    const newEvent = events[0];
    expect(newEvent.title).toBe('Got a haircut');
    expect(newEvent.anchorDate.getDate()).toBe(date.date());
});

test('Create future event', async() => {
    const event = {
        title: 'Doctors appointment',
        anchorDate: '2020-02-20T00:00:00',
        allDay: true
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await BulletModel.find();
    expect(events.length).toBe(1);

    const newEvent = events[0];
    expect(newEvent.title).toBe('Doctors appointment');
    expect(newEvent.anchorDate.toDateString()).toBe('Thu Feb 20 2020');
    expect(newEvent.allDay).toBe(true);
});

test('Create event with time', async() => {
    const event = {
        title: 'Doctors appointment',
        anchorDate: '2020-02-20T08:00:00'
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await BulletModel.find();
    expect(events.length).toBe(1);

    const newEvent = events[0];
    expect(newEvent.title).toBe('Doctors appointment');
    expect(newEvent.anchorDate.toDateString()).toBe('Thu Feb 20 2020');
    expect(newEvent.anchorDate.getHours()).toBe(8);
    expect(newEvent.anchorDate.getMinutes()).toBe(0);
    expect(newEvent.allDay).toBe(false);
});

test('Create note', async() => {
    const note = {
        title: 'Test note'
    }

    await request(app).post('/notes')
    .send(note)
    .expect(201);

    const notes = await BulletModel.find();
    expect(notes.length).toBe(1);

    const noteSpec = await NoteModel.find();
    expect(noteSpec.length).toBe(1);

    const newNote = notes[0];
    expect(newNote.title).toBe('Test note');
});

test('Check inheritance', async() => {
    const task = {
        title: 'Take out trash'
    }

    const event = {
        title: 'Doctors appointment',
        anchorDate: '2020-02-20'
    }

    const note = {
        title: 'Test note'
    }

    await request(app).post('/tasks')
    .send(task)
    .expect(201);

    await request(app).post('/events')
    .send(event)
    .expect(201);

    await request(app).post('/notes')
    .send(note)
    .expect(201);

    const bullets = await BulletModel.find();
    expect(bullets.length).toBe(3);

    const tasks = await TaskModel.find();
    expect(tasks.length).toBe(1);

    const events = await EventModel.find();
    expect(events.length).toBe(1);

    const notes = await NoteModel.find();
    expect(notes.length).toBe(1);
})