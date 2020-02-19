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

test('Create task', async() => {
    const task = {
        title: 'Take out trash'
    }

    await request(app).post('/tasks')
    .send(task)
    .expect(201);

    const tasks = await Bullet.find();
    expect(tasks.length).toBe(1);

    const taskSpec = await Task.find();
    expect(taskSpec.length).toBe(1);

    const newTask = tasks[0];
    expect(newTask.title).toBe('Take out trash');
    expect(newTask.description).toBeUndefined();
    expect(newTask.addedDate).toBeDefined();
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

    const tasks = await Bullet.find();
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

    const events = await Bullet.find();
    expect(events.length).toBe(1);

    const eventSpec = await Event.find();
    expect(eventSpec.length).toBe(1);

    const newEvent = events[0];
    expect(newEvent.title).toBe('Got a haircut');
    expect(newEvent.eventDate.day).toBe(Date.now.day);
});

test('Create future event', async() => {
    const event = {
        title: 'Doctors appointment',
        eventDate: '2020-02-20T00:00:00',
        allDay: true
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await Bullet.find();
    expect(events.length).toBe(1);

    const newEvent = events[0];
    expect(newEvent.title).toBe('Doctors appointment');
    expect(newEvent.eventDate.toDateString()).toBe('Thu Feb 20 2020');
    expect(newEvent.allDay).toBe(true);
});

test('Create event with time', async() => {
    const event = {
        title: 'Doctors appointment',
        eventDate: '2020-02-20T08:00:00'
    }

    await request(app).post('/events')
    .send(event)
    .expect(201);

    const events = await Bullet.find();
    expect(events.length).toBe(1);

    const newEvent = events[0];
    expect(newEvent.title).toBe('Doctors appointment');
    expect(newEvent.eventDate.toDateString()).toBe('Thu Feb 20 2020');
    expect(newEvent.eventDate.getHours()).toBe(8);
    expect(newEvent.eventDate.getMinutes()).toBe(0);
    expect(newEvent.allDay).toBe(false);
});

test('Create note', async() => {
    const note = {
        title: 'Test note'
    }

    await request(app).post('/notes')
    .send(note)
    .expect(201);

    const notes = await Bullet.find();
    expect(notes.length).toBe(1);

    const noteSpec = await Note.find();
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
        eventDate: '2020-02-20'
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

    const bullets = await Bullet.find();
    expect(bullets.length).toBe(3);

    const tasks = await Task.find();
    expect(tasks.length).toBe(1);

    const events = await Event.find();
    expect(events.length).toBe(1);

    const notes = await Note.find();
    expect(notes.length).toBe(1);
})