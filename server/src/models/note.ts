import * as mongoose from 'mongoose';
const Bullet = require('./bullet');

const Note = Bullet.discriminator('note', new mongoose.Schema({}));

module.exports = Note;