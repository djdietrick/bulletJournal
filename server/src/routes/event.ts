import {Router, Request, Response} from 'express';
const Event = require('../models/event');
import * as moment from 'moment';
const auth = require('../middleware/auth');

export function EventRouter(router: Router = Router()): Router {
    router.post('/events', auth, createEvent);
    router.get('/events', auth, getEvents);
    router.get('/events/week', auth, getEventsByWeek);
    router.get('/events/:id', auth, getEvent);
    router.patch('/events/:id', auth, updateEvent);
    router.delete('/events/:id', auth, deleteEvent);

    return router;
}

async function createEvent(req: any, res: Response) {
    try {
        const event = await new Event({
            ...req.body,
            owner: req.user._id
        }).save();

        return res.status(201).send(event);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

// /events?year=2020&month=01 , gets all events in the given month (index starts at 0) with importance high or medium
// /events?year=2020 , gets events in the given year with importance high (for yearly view)
async function getEvents(req: any, res: Response) {
    const match = {}
    const sort = {}

    match["owner"] = req.user._id;

    // Matches
    if(req.query.year && req.query.month) {
        const year: number = parseInt(req.query.year);
        const month: number = parseInt(req.query.month);
        match["$or"] = [
            {
                anchorDate: {
                    $gte: new Date(year, month),
                    $lt: new Date(year, month + 1)
                }
            },
            {
                endDate: {
                    $gte: new Date(year, month),
                    $lt: new Date(year, month + 1)
                }
            }
        ];

        match["importance"] = {
            $in: ['HIGH', 'MEDIUM']
        };
    } else if (req.query.year) {
        const year = parseInt(req.query.year);
        match["$or"] = [
            {
                anchorDate: {
                    $gte: new Date(year, 0),
                    $lt: new Date(year + 1, 0)
                }
            },
            {
                endDate: {
                    $gte: new Date(year, 0),
                    $lt: new Date(year + 1, 0)
                }
            }
        ];

        match["importance"] = 'HIGH';
    } else {
        return res.status(400).send("Must provide either a month and year or just a year");
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
        const data = await Event.find(match, null, options);

        res.send(data);
    } catch(e) {
        console.log(e.message);
        res.status(500).send();
    }
}

async function getEventsByWeek(req: any, res: Response) {
    
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

        match["$or"] = [
            {
                anchorDate: duration
            },
            {
                endDate: duration
            }
        ];

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
        const data = await Event.find(match, null, options);

        return res.send(data);

    } catch(e) {
        console.error(e.message);
        return res.status(500).send(e.message);
    }
}

async function getEvent(req: Request, res: Response) {
    const _id = req.params.id;

    try {
        const evnt = await Event.findOne({ _id });

        if (!evnt) {
            return res.status(404).send();
        }

        return res.send(evnt);
    } catch (e) {
        return res.status(500).send();
    }
}


async function updateEvent(req: Request, res: Response) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'notes', 'anchorDate', 
    'allDay', 'importance', 'location', 'endDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
        console.error("Invalid updates for event update: ", invalidUpdates);
        return res.status(400).send({ 
            error: 'Invalid updates!', 
            invalidUpdates
        })
    }

    try {
        const evnt = await Event.findOne({ _id: req.params.id})

        if (!evnt) {
            return res.status(404).send()
        }

        updates.forEach((update) => evnt[update] = req.body[update])
        await evnt.save()
        res.send(evnt)
    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteEvent(req: Request, res: Response) {
    try {
        const evnt = await Event.findOneAndDelete({ _id: req.params.id})

        if (!evnt) {
            console.log("Could not find event with id ", req.params.id);
            return res.status(404).send();
        }

        return res.send(evnt);
    } catch (e) {
        res.status(500).send()
    }
}
