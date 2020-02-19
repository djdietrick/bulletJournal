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

test('Update task', async() => {
    
});

test('Update event', async() => {

});

test('Update note', async() => {

});