const request = require('supertest');
const app = require('../app');
const {clearBullets, loadBullets} = require('./fixtures/db');

beforeEach(async() => {
    await clearBullets();
    await loadBullets();
});

test('Get single event', async() => {

});

test('Get events for year', async() => {
    const response = await request(app).get('/events?year=2019')
    .expect(200);

    console.debug(response.body);
});

test('Get events for year and month', async() => {

});

test('Negative event tests', async() => {

});

test('Get single task', async() => {

});

test('Get tasks for month and year', async() => {

});

test('Negative task tests', async() => {

});

test('Get single note', async() => {

});

test('Get notes for month and year', async() => {

});

test('Negative note tests', async() => {

});