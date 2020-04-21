import {Router, Request, Response} from 'express';
const Task = require('../models/task');
let router = Router();
import * as moment from 'moment';
const auth = require('../middleware/auth');

export function TaskRouter(router: Router = Router()): Router {
    router.post('/tasks', auth, createTask);
    router.get('/tasks', auth, getTasks);
    router.get('/tasks/week', auth, getTasksByWeek);
    router.get('/tasks/:id', auth, getTask);
    router.patch('/tasks/:id', auth, updateTask);
    router.delete('/tasks/:id', auth, deleteTask);

    return router;
}

async function createTask(req: any, res: Response) {
    try {
        const task = await new Task({
            ...req.body,
            owner: req.user._id
        }).save();

        return res.status(201).send(task);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

async function getTasks(req: any, res: Response) {
    const match = {}
    const sort = {}

    match["owner"] = req.user._id;

    // Matches
    if (req.query.completed) {
        match["completed"] = req.query.completed === 'true'
    }

    if(req.query.year && req.query.month) {
        const year = parseInt(req.query.year);
        const month = parseInt(req.query.month);
        // match["anchorDate"] = {
        //     $gte: new Date(year, month),
        //     $lt: new Date(year, month + 1)
        // }

        match["$or"] = [
            {
                anchorDate: {
                    $gte: new Date(year, month),
                    $lt: new Date(year, month + 1)
                }
            },
            {
                $and: [
                    {
                        completed: false
                    },
                    {
                        anchorDate: {
                            $lt: new Date(year, month + 1)
                        }
                    }
                ]
            },
            {
                $and: [
                    {
                        anchorDate: {
                            $lt: new Date(year, month + 1)
                        }
                    },
                    {
                        completedDate: {
                            $gte: new Date(year, month),
                        }
                    }
                ]   
            }
        ];
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
        const data = await Task.find(match, null, options);

        res.send(data);
    } catch(e) {
        res.status(500).send();
    }
}

async function getTask(req: Request, res: Response) {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
}

async function getTasksByWeek(req: any, res: Response) { 
    try {
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
                dueDate: duration
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
  
        const data = await Task.find(match, null, options);

        return res.send(data);

    } catch(e) {
        console.error(e.message);
        return res.status(500).send(e.message);
    }
}

async function updateTask(req: Request, res: Response) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'anchorDate', 'description', 'notes', 'completed', 'dueDate', 'status', 'completedDate'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
        console.debug("Invalid update(s): ", invalidUpdates);
        return res.status(400).send({ 
            error: 'Invalid updates!', 
            invalidUpdates
        })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteTask(req: Request, res: Response) {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
}
