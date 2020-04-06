import {Router, Request, Response} from 'express';
const User = require('../models/user');

export function UserRouter(router: Router = Router()): Router {
    router.post('/users', createUser);
    router.post('/users/login', loginUser);
    router.post('/users/logout', logoutUser);

    return router;
}

async function createUser(req: Request, res: Response) {
    try {
        const user = new User(req.body);

        await user.save();
        const token = await user.generateAuthToken();

        return res.status(201).send({ user, token });
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        return res.send({ user, token });
    } catch (e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

async function logoutUser(req: any, res: Response) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
}