import {App} from './app';
const http = require('http');

let port: Number = parseInt(process.env.PORT) || 3000;

const app = new App();
let server = http.createServer(app.express);
server.listen(port);