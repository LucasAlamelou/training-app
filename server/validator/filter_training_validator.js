import { check } from 'express-validator';

export function filterTrainingValidator() {
    return [
        check('year', 'Veillez saisir une année valide')
            .isNumeric({ no_symbols: true })
            .isLength({ min: 4, max: 4 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une année valide'),
        check('month', 'Veillez saisir un mois valide')
            .isInt({ min: 0, max: 12 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un mois valide'),
        check('day', 'Veillez saisir un jour valide')
            .isInt({ min: 0, max: 31 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un jour valide'),
    ];
}
