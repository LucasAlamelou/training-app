import { Router } from 'express';
import { getSomething } from '../database/connection-data-base.js';
var router = Router();

/* GET home page. */
router.get('/home', async (req, res, next) => {
    const result = await getSomething();
    res.send({ result: result });
});

export default router;
