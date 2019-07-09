import { Request, Response, Router, NextFunction } from 'express';

import v1route from './v1';

const router: Router = Router();

router.use('/v1', v1route);

router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send("This is the primary API route");
});

export default router;