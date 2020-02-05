const request = require('supertest');
const path = require('path');
const app = require('../app');
const {Bullet, Task, Event, Note} = require('../models/bullet');
const {clearBullets} = require('./fixtures/db');

beforeEach(async() => {
    await clearBullets();
});

test('Create task', async() => {
    const task = {
        title: 'Take out trash'
    }

    const response = await request(app).post('/create/tasks')
    .send(task)
    .expect(200);

    const tasks = await Bullet.find();
    expect(tasks.length).toBe(1);

    const newTask = tasks[0];
    expect(newTask.title).toBe('Take out trash');
    expect(newTask.description).toBeUndefined();
    expect(newTask.addedDate).toBeDefined();
    expect(newTask.notes.length).toBe(0);
    expect(newTask.dueDate).toBeUndefined();
    expect(newTask.completed).toBe(false);
    expect(newTask.status).toBe('InProgress');
});