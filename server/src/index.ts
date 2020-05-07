import {App} from './app';
const https = require('https');
const fs = require('fs');

let port: Number = parseInt(process.env.PORT) || 3000;

const app = new App();

if(process.env.NODE_ENV === 'dev') {
    app.listen(port);
} else {    
    const options = {
        key: fs.readFileSync(process.env.KEY_LOCATION),
        cert: fs.readFileSync(process.env.CERT_LOCATION)
    }

    let server = https.createServer(options, app.express);
    server.listen(port);
}
