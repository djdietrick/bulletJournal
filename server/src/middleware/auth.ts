const jwt = require('jsonwebtoken')
const User = require('../models/user')
import {Request, Response, NextFunction} from 'express';

const auth = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error("User not found");
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        return res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth