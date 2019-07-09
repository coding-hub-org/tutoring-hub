import { Router } from 'express';
import apiRoute from './api';


const router: Router = Router();

router.use('/api', apiRoute);


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This is the homepage of the server");
});

router.post('/', function (req, res, next) {
  res.json(req.body);
});

export default router;