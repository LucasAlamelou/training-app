import { check } from 'express-validator';

export function fonctionnaliteValidator() {
    return [
        check('name', 'Veillez saisir un nom valide')
            .notEmpty()
            .isString()
            .isLength({ min: 3, max: 50 })
            .withMessage('Veillez saisir un nom valide entre 3 et 50 caractères'),
        check('description', 'Veillez saisir un description valide')
            .notEmpty()
            .isString()
            .withMessage('Veillez saisir un description valide'),
        check('date', 'Veillez saisir un date valide')
            .optional({ nullable: true, checkFalsy: true })
            .isDate({ format: 'YYYY-MM-DD', delimiters: ['-', '/'], strictMode: true })
            .withMessage('Veillez saisir un date valide'),
        check('isActive', 'Veillez saisir un isActive valide')
            .optional({ nullable: true, checkFalsy: true })
            .isBoolean()
            .withMessage('Veillez saisir un isActive valide'),
        check('updatedAt', 'Veillez saisir un updatedAt valide')
            .optional({ nullable: true, checkFalsy: true })
            .isDate({ format: 'YYYY-MM-DD', delimiters: ['-', '/'], strictMode: true })
            .withMessage('Veillez saisir un updatedAt valide'),
    ];
}

export function fonctionnaliteActiveValidator() {
    return [
        check('isActive', 'Veillez saisir un isActive valide')
            .notEmpty()
            .isBoolean()
            .withMessage('Veillez saisir un isActive valide'),
        check('updatedAt', 'Veillez saisir un updatedAt valide')
            .optional({ nullable: true, checkFalsy: true })
            .isDate({ format: 'YYYY-MM-DD', delimiters: ['-', '/'], strictMode: true })
            .withMessage('Veillez saisir un updatedAt valide'),
    ];
}
