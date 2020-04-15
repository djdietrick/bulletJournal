import {Router, Request, Response} from 'express';
const router = Router();
const Bullet = require('../models/bullet');
const auth = require('../middleware/auth');

export function SharedRouter(router: Router = Router()): Router {
    router.delete('/:id', auth, deleteBullet);

    return router;
}

async function deleteBullet(req: Request, res: Response) {
    try {
        const bullet = await Bullet.findOneAndDelete({ _id: req.params.id});

        if (!bullet) {
            res.status(404).send();
        }

        res.send(bullet);
    } catch (e) {
        res.status(500).send();
    }
}

// Get 100 bullets from the past for display in day view
// router.get("/bullets", async(req, res) => {
//     const match = {}

//     try {
//         if(parseInt(req.query.index) <= 0) {
//             match.$or = [
//                 {
//                     anchorDate: {
//                         $lte: new Date()
//                     }
//                 },
//                 {
//                     endDate: {
//                         $lte: new Date()
//                     }
//                 },
//                 {
//                     dueDate: {
//                         $lte: new Date()
//                     }
//                 }
//             ];
//         } else {
//             match.$or = [
//                 {
//                     anchorDate: {
//                         $gte: new Date()
//                     }
//                 },
//                 {
//                     endDate: {
//                         $gte: new Date()
//                     }
//                 },
//                 {
//                     dueDate: {
//                         $gte: new Date()
//                     }
//                 }
//             ];
//         }

//         sort = {
//             anchorDate: -1
//         }
        
//         // TODO : replace skip when
//         let limit = 50;
//         if(parseInt(req.query.index) !== 0)
//             limit *= Math.abs(parseInt(req.query.index));

//         const options = {
//             limit,
//             skip: parseInt(req.query.index) * 50,
//             sort
//         }

    
//         const data = await Bullet.find(match, null, options);

//         res.send(data);
//     } catch(e) {
//         console.error(e.message);
//         res.status(500).send();
//     }
// });
