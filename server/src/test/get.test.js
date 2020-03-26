const request = require('supertest');
const app = require('../app');
const Event = require('./../../src/models/event');
const Bullet = require('../../src/models/bullet');
const {clearBullets, loadBullets} = require('./fixtures/db');

beforeEach(async() => {
    await clearBullets();
    await loadBullets();
});

test('Get single event', async() => {
    const events = await Event.find();
    const event = events[0];

    const response = await request(app).get(`/events/${event._id}`)
    expect(200);

    const getEvent = response.body;

    expect(getEvent._id.toString()).toBe(event._id.toString());
});

test('Get events for year', async() => {
    const response = await request(app).get('/events?year=2019')
    .expect(200);

    const events = response.body;
    expect(events.length).toBe(3);

    events.forEach((event) => {
        expect(event.title).toBe("Phish");
        expect(event.importance).toBe("HIGH");
        const d = new Date(event.anchorDate);
        expect(d.getFullYear()).toBe(2019);
    });
});

test('Get events spanning two years', async() => {
    const desc = "Test event spanning 2 years";

    let response = await request(app).get('/events?year=2019')
    .expect(200);

    let events = response.body;
    let eventDesc = events.map(event => event.description);

    expect(eventDesc.includes(desc)).toBe(true);

    response = await request(app).get('/events?year=2020')
    .expect(200);

    events = response.body;
    eventDesc = events.map(event => event.description);

    expect(eventDesc.includes(desc)).toBe(true);
});

test('Get events for year and month', async() => {
    let response = await request(app).get('/events?year=2020&month=0')
    .expect(200);

    const events = response.body;
    expect(events.length).toBe(3);

    const eventTitles = events.map(event => event.title);

    expect(eventTitles.includes("Phish")).toBe(true);
    expect(eventTitles.includes("Jam Cruise 18")).toBe(true);
    expect(eventTitles.includes("Goose")).toBe(true);
});

test('Get events spanning two months', async() => {
    const desc = "Crystal Springs Trip";

    let response = await request(app).get('/events?year=2020&month=1')
    .expect(200);

    let events = response.body;
    let eventTitles = events.map(event => event.title);

    expect(eventTitles.includes(desc)).toBe(true);

    response = await request(app).get('/events?year=2020&month=2')
    .expect(200);

    events = response.body;
    eventTitles = events.map(event => event.title);

    expect(eventTitles.includes(desc)).toBe(true);
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

test('Get bullets', async() => {
    let response = await request(app).get('/bullets?limit=100')
    .expect(200);
});