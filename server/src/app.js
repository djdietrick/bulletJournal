let express = require('express');
let https = require('https');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');
let cors = require('cors');

let port = process.env.PORT;

// Connect to DB
require('../db/mongoose');

const publicDir = path.join(__dirname, '../../client/public/');

let app = express();

app.use(express.static(publicDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

const taskRouter = require('./routes/task');
const eventRouter = require('./routes/event');
const noteRouter = require('./routes/note');
const sharedRouter = require('./routes/shared');

app.use(taskRouter);
app.use(eventRouter);
app.use(noteRouter);
app.use(sharedRouter);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: publicDir});
});

if(process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log('Server is up on http://localhost:' + port);
    });
}

module.exports = app;