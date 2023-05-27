import { validationResult } from 'express-validator';

export function asErrorValidator(req, res) {
    const errors = validationResult(req);
    //console.log('errors', errors);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((error) => error.msg);
        return res.status(400).json({ error: messages, info: null });
    }
    return null;
}

/*

const errorValidator = asErrorValidator(req, res);
    if (errorValidator) { return; }
*/
