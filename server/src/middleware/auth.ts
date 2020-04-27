const jwt = require('jsonwebtoken');
const User = require('../models/user');
import {Request, Response, NextFunction} from 'express';

const auth = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error(`User not found, Id [${decoded._id}], Token [${token}]`);
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.log(e.message);
        if(e.message === 'Incorrect password')
            return res.status(401).send(e.message);
        return res.status(403).send(e.message);
    }
}

module.exports = auth