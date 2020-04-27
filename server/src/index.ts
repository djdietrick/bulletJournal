import {App} from './app';
const http = require('https');
const fs = require('fs');

let port: Number = parseInt(process.env.PORT) || 3000;

const app = new App();

const options = {
    key: fs.readFileSync(process.env.KEY_LOCATION),
    cert: fs.readFileSync(process.env.CERT_LOCATION)
}

let server = http.createServer(options, app.express);
server.listen(port);