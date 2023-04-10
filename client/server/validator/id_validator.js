import { check } from 'express-validator';

export function idMemberValidator() {
    return [
        check('idMember', 'Veillez saisir un id member valide')
            .notEmpty()
            .isNumeric({ no_symbols: true })
            .withMessage('Veillez saisir un id member valide'),
    ];
}

export function idUserValidator() {
    return [
        check('idUser', 'Veillez saisir un id user valide')
            .notEmpty()
            .isNumeric({ no_symbols: true })
            .withMessage('Veillez saisir un id user valide'),
    ];
}

export function idTrainingValidator() {
    return [
        check('idTraining', 'Veillez saisir un id training valide')
            .notEmpty()
            .isNumeric({ no_symbols: true })
            .withMessage('Veillez saisir un id training valide'),
    ];
}

export function idTypeOfTrainingValidator() {
    return [
        check('idTypeOfTraining', 'Veillez saisir un id type of training valide')
            .notEmpty()
            .isNumeric({ no_symbols: true })
            .withMessage('Veillez saisir un id type of training valide'),
    ];
}

export function idFonctionnaliteValidator() {
    return [
        check('idFonctionnalite', 'Veillez saisir un id fonctionnalite valide')
            .notEmpty()
            .isNumeric({ no_symbols: true })
            .withMessage('Veillez saisir un id fonctionnalite valide'),
    ];
}
