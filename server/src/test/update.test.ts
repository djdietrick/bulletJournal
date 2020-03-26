export {};
const request = require('supertest');
const path = require('path');
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

test('Update task', async() => {
    
});

test('Update event', async() => {

});

test('Update note', async() => {

});