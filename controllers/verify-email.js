import jwt from 'jsonwebtoken';
import { setEmailVerifyTrue } from '../database/update-on-data-base.js';
import { getUserById } from '../database/connection-data-base.js';
import { asErrorValidator } from '../validator/errors_validator.js';

export const validEmailUser = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const { token } = req.query;
        if (!token) {
            res.json({ info: null, error: { message: 'Token pas présent.' } }).status(404);
            return;
        }
        jwt.verify(token, process.env.EMAIL_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.error(err);
                res.json({
                    error: { message: 'Token invalide' },
                    info: null,
                }).status(401);
                return;
            } else {
                // Change le champ en BDD a true
                const user = getUserById(user.id);
                if (user.emailVerify) {
                    res.json({ info: null, error: { message: 'Email déjà vérifié' } }).status(200);
                    return;
                }
                const result = setEmailVerifyTrue(user.id);
                if (result) {
                    res.json({ info: { message: 'Email vérifié' }, error: null }).status(200);
                    return;
                }
            }
        });
    } catch (error) {
        res.json({ error: { message: error.message } }).status(500);
    }
};
