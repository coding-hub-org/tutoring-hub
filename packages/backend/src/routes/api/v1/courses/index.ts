import { Router } from 'express';

const router: Router = Router({
    mergeParams: true
});


const Tutor = require('../../../../models/tutors');

router.get('/', (req, res, next) => {
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