import { check } from 'express-validator';

export function tokenValidator() {
    return [check('token', 'Veillez renseigner un token').notEmpty()];
}
