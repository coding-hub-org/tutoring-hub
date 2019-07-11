import { Request, Response, Router, NextFunction } from 'express';
import apiRoute from './api';


const router: Router = Router();

router.use('/api', apiRoute);


/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send("This is the homepage of the server");
});

router.post('/', function (req: Request, res: Response, next: NextFunction) {
  res.json(req.body);
});

export default router;