import { Request, Response, Router, NextFunction } from 'express';
import { Tutor } from '../../../../models/tutors';

const router: Router = Router({
    mergeParams: true
});


router.get('/', (req: Request, res: Response, next: NextFunction) => {
    let result: any[] = [];
    Tutor.find({}, function (err, tutors: any[]) {
        if (err) {
            console.log(err);
            return;
        }
        for (const tutor of tutors) {
            const courses: any[] = tutor.courses;
            for (const course of courses) {
                if (result.indexOf(course) === -1)
                    result.push(course);
            }
        }
        res.send(result);
    });
});

export default router;