import {App} from './app';

let port: Number = parseInt(process.env.PORT) || 3000;

const app = new App();
app.listen(port);