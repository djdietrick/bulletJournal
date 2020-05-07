import * as express from 'express';
//let express = require('express');

let https = require('https');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');
let cors = require('cors');

import {EventRouter} from './routes/event';
import {NoteRouter} from './routes/note';
import {SharedRouter} from './routes/shared';
import {TaskRouter} from './routes/task';
import {UserRouter} from './routes/user';

const publicDir = path.join(__dirname, '../../client/dist/');

export class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.initSettings();
        this.initDb();
        this.initRouters();
    }

    public listen(port: Number): void {
        this.express.listen(port, () => {
            console.log('Server is up on http://localhost:' + port);
        });
    }

    private initSettings(): void {
        this.express.use(express.static(publicDir));

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));

        this.express.use(cors());
    }

    private initDb(): void {
        require('./db/mongoose');
    }

    private initRouters(): void {
        this.express.use('/api', TaskRouter());
        this.express.use('/api', EventRouter());
        this.express.use('/api', NoteRouter());
        this.express.use('/api', SharedRouter());
        this.express.use('/api', UserRouter());

        this.express.get(/.*/, (req: express.Request, res: express.Response) => {
            res.sendFile('index.html', {root: publicDir});
        });
    }
}
