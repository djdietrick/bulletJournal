import {Router, Request, Response} from 'express';
const Note = require('../models/note');
let router = Router();
import * as moment from 'moment';
const auth = require('../middleware/auth');

export function NoteRouter(router: Router = Router()): Router {
    router.post('/notes', auth, createNote);
    router.get('/notes', auth, getNotes);
    router.get('/notes/week', auth, getNotesByWeek);
    router.get('/notes/:id', auth, getNote);
    router.patch('/notes/:id', auth, updateNote);
    router.delete('/notes/:id', auth, deleteNote);

    return router;
}

async function createNote(req: any, res: Response) {
    try {
        const note = await new Note({
            ...req.body,
            owner: req.user._id
        }).save();

        return res.status(201).send(note);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

async function getNotes(req: any, res: Response) {
    const match = {}
    const sort = {}

    match["owner"] = req.user._id;

    // Matches
    if(req.query.year && req.query.month) {
        match["anchorDate"] = {
            $gte: new Date(req.query.year, req.query.month, 1),
            $lt: new Date(req.query.year + 1, req.query.month + 1, 1)
        }
    } else {
        return res.status(400).send("Must provide a month and year");
    }

    // Sorts
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
    }

    try {
        const data = await Note.find(match, null, options);

        res.send(data);
    } catch(e) {
        res.status(500).send();
    }
}

async function getNote(req: Request, res: Response) {
    const _id = req.params.id;

    try {
        const note = await Note.findOne({ _id });

        if (!note) {
            return res.status(404).send();
        }

        res.send(note);
    } catch (e) {
        res.status(500).send();
    }
}

async function getNotesByWeek(req: any, res: Response) {
    const match = {}
    const sort = {}

    match["owner"] = req.user._id;

    if(!req.query.date)
        return res.status(400).send("Must provide either a month and year or just a year");

    // Matches
    const date: moment.Moment = moment(req.query.date, "YYYY-M-D");

    const start: Date = new Date(date.year(), date.month(), date.date());
    const end: Date = new Date(date.year(), date.month(), date.date() + 7);
    const duration = {
        $gte: start,
        $lt: end
    }
    
    match["anchorDate"] = duration;

        // Sorts
    if (req.query.sortBy) {
        sort["anchorDate"] =  1
    }

    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
    }

    try {
        const data = await Note.find(match, null, options);

        return res.send(data);

    } catch(e) {
        console.error(e.message);
        return res.status(500).send(e.message);
    }
}

async function updateNote(req: Request, res: Response) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'notes'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
        return res.status(400).send({ 
            error: 'Invalid updates!', 
            invalidUpdates
        })
    }

    try {
        const note = await Note.findOne({ _id: req.params.id})

        if (!note) {
            return res.status(404).send()
        }

        updates.forEach((update) => note[update] = req.body[update])
        await note.save()
        res.send(note)
    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteNote(req: Request, res: Response) {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id})

        if (!note) {
            res.status(404).send()
        }

        res.send(note)
    } catch (e) {
        res.status(500).send()
    }
}
