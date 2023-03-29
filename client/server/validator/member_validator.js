import { check } from 'express-validator';

export function memberValidator() {
    return [
        check('firstName', 'Veillez saisir un prénom valide')
            .notEmpty()
            .isAlpha('fr-FR', { ignore: ' -' })
            .withMessage('Veillez saisir un prénom valide'),
        check('lastName', 'Veillez saisir un nom valide')
            .notEmpty()
            .isAlpha('fr-FR', { ignore: ' -' })
            .withMessage('Veillez saisir un nom valide'),
        check('dateOfBirth', 'Veillez saisir une date de naissance valide')
            .notEmpty()
            .isDate({ format: 'YYYY-MM-DD', delimiters: ['-', '/'], strictMode: true })
            .withMessage('Veillez saisir une date de naissance valide'),
        check('adress', 'Veillez saisir une adresse valide')
            .isString()
            .isLength({ min: 5, max: 150 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une adresse valide entre 5 et 150 caractères'),
        check('city', 'Veillez saisir une ville valide')
            .isString()
            .isLength({ min: 2, max: 20 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une ville valide'),
        check('zipCode', 'Veillez saisir un code postal valide')
            .isPostalCode('FR')
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un code postal français valide'),
        check('country', 'Veillez saisir un pays valide')
            .isString()
            .isLength({ min: 2, max: 20 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un pays valide entre 2 et 20 caractères'),
    ];
}

export function memberHealthValidator() {
    return [
        check('height', 'Veillez saisir une taille valide')
            .isInt({ min: 0, max: 300 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une taille valide'),
        check('weight', 'Veillez saisir un poids valide')
            .isInt({ min: 0, max: 300 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un poids valide'),
        check('hoursOfSleep', "Veillez saisir un nombre d'heures de sommeil valide")
            .isDate({ format: 'HH:mm', delimiters: [':', '/'], strictMode: true })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage("Veillez saisir un nombre d'heures de sommeil valide"),
    ];
}

export function memberPerformanceValidator() {
    return [
        check('vo2max', 'Veillez saisir un VO2max valide')
            .isInt({ min: 0, max: 100 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un VO2max valide'),
        check('seuilLactateFc', 'Veillez saisir un seuil de lactate valide')
            .isInt({ min: 0, max: 250 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un seuil de lactate valide'),
        check('seuilLactate', 'Veillez saisir un seuil de lactate valide format XX:XX')
            .isString()
            .isLength({ min: 4, max: 5 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un seuil de lactate valide format XX:XX'),
        check('fcRest', 'Veillez saisir une fréquence cardiaque de repos valide')
            .isInt({ min: 0, max: 250 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une fréquence cardiaque de repos valide'),
        check('fcMax', 'Veillez saisir une fréquence cardiaque maximale valide')
            .isInt({ min: 0, max: 250 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une fréquence cardiaque maximale valide'),
        check('vma', 'Veillez saisir une VMA valide')
            .isInt({ min: 0, max: 30 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une VMA valide'),
        check('favoriteSport', 'Veillez saisir un sport favori valide')
            .isString()
            .isLength({ min: 2, max: 20 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un sport favori valide'),
    ];
}
