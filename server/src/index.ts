import {App} from './app';
const http = require('https');

let port: Number = parseInt(process.env.PORT) || 3000;

const app = new App();

const options = {
    key: process.env.KEY_LOCATION,
    cert: process.env.CERT_LOCATION
}

let server = http.createServer(options, app.express);
server.listen(port);