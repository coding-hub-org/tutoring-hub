import { Request, Response, Router, NextFunction } from 'express';
import tutorsRoute from './tutors';
import coursesRoute from './courses';
import cloudinaryRoute from './cloudinary';
import authRoute from './auth';

const router: Router = Router();

router.use('/tutors', tutorsRoute);
router.use('/courses', coursesRoute);

router.use('/cloudinary', cloudinaryRoute);

router.use('/auth', authRoute);

router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.send("This is the main API v1 page.");
});

export default router;