const App = require('../app');
const BulletModel = require('../models/bullet');
const TaskModel = require('../models/task');
const EventModel = require('../models/event');
const NoteModel = require('../models/note');
const request = require('supertest');
const moment = require('moment');

const app = new App().express;