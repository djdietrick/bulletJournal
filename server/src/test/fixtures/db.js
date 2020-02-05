const {Bullet, Task, Event, Note} = require('../../models/bullet');

const clearBullets = async () => {
    await Bullet.deleteMany();
}

module.exports = {
    clearBullets
}