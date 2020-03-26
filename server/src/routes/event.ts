import {Router, Request, Response} from 'express';
const Event = require('../models/event');
let router = Router();
let moment = require('moment');

export function EventRouter(router: Router = Router()): Router {
    router.post('/events', createEvent);
    router.get('/events', getEvents);
    router.get('events/byweek', getEventsByWeek);
    router.get('/events/:id', getEvent);
    router.patch('/events/:id', updateEvent);
    router.delete('/events/:id', deleteEvent);

    return router;
}

async function createEvent(req: Request, res: Response) {
    try {
        const evnt = await new Event(req.body).save();

        return res.status(201).send(evnt);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

// /events?year=2020&month=01 , gets all events in the given month (index starts at 0) with importance high or medium
// /events?year=2020 , gets events in the given year with importance high (for yearly view)
async function getEvents(req: Request, res: Response) {
    const match = {}
    const sort = {}

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
        console.error(e.message);
        res.status(500).send();
    }
}

async function getEventsByWeek(req: Request, res: Response) {
    const match = {}
    const sort = {}

    // Matches
    if(req.query.year && req.query.week) {
        const year = parseInt(req.query.year);
        const week = parseInt(req.query.week);

        const start = moment().week(week).year(year);
        const end = moment().week(week).year(year);
        console.log("Start: ", start);
        console.log("End: ", end);
        // match["$or"] = [
        //     {
        //         anchorDate: {
        //             $gte: moment(),
        //             $lt: new Date(year, month + 1)
        //         }
        //     },
        //     {
        //         endDate: {
        //             $gte: new Date(year, month),
        //             $lt: new Date(year, month + 1)
        //         }
        //     }
        // ];
    } else {
        return res.status(400).send("Must provide either a month and year or just a year");
    }
}

async function getEvent(req: Request, res: Response) {
    const _id = req.params.id;

    try {
        const evnt = await Event.findOne({ _id });

        if (!evnt) {
            return res.status(404).send();
        }

        res.send(evnt);
    } catch (e) {
        res.status(500).send();
    }
}


async function updateEvent(req: Request, res: Response) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'notes', 'anchorDate', 'allDay', 'importance'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
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
            res.status(404).send()
        }

        res.send(evnt)
    } catch (e) {
        res.status(500).send()
    }
}
