let express = require('express');
let https = require('https');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');

let port = process.env.PORT;

const bulletRouter = require('./routes/bullet');

// Connect to DB
require('../db/mongoose');

const publicDir = path.join(__dirname, '../../client/public/');

let app = express();

app.use(express.static(publicDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bulletRouter);

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: publicDir});
});

app.listen(port, () => {
    console.log('Server is up on http://localhost:' + port);
});

module.exports = app;