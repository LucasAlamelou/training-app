import { Router } from 'express';
import { getUserById } from '../database/connection-data-base.js';
import { generateAccessToken } from '../util/generateToken.js';
const router = Router();

/* GET home page. */
router.get('/welcome', async (req, res, next) => {
    const token = generateAccessToken({ id: 0 });
    console.log(token);
    const result = await getUserById(1);
    res.send({ result: result, token });
});

export default router;
