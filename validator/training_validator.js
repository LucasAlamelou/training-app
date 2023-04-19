import { check } from 'express-validator';
import { DateUtils } from '../util/DateUtils.js';

export function trainingValidator() {
    return [
        check('name', 'Veillez saisir un nom valide')
            .notEmpty()
            .isString()
            .isLength({ min: 2, max: 50 })
            .withMessage('Veillez saisir un nom valide entre 2 et 50 caractères'),
        check('note', 'Veillez saisir une note valide')
            .isString()
            .isLength({ min: 0, max: 300 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une note valide entre 0 et 300 caractères'),
        check('date', 'Veillez saisir une date valide')
            .notEmpty()
            .isDate({ format: 'YYYY-MM-DD', delimiters: ['-', '/'], strictMode: true })
            .withMessage('Veillez saisir une date valide'),
        check('city', 'Veillez saisir une ville valide')
            .notEmpty()
            .isString()
            .optional({ nullable: true, checkFalsy: true })
            .isLength({ min: 2, max: 20 })
            .withMessage('Veillez saisir une ville valide'),
        check('country', 'Veillez saisir un pays valide')
            .notEmpty()
            .isString()
            .isLength({ min: 2, max: 20 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un pays valide entre 2 et 20 caractères'),
        check('idTypeOfTraining', 'Veillez saisir un type de séance valide')
            .notEmpty()
            .isInt()
            .withMessage('Veillez saisir un type de séance valide'),
        check('km', 'Veillez saisir un nombre de kilomètres valide')
            .isFloat({ min: 0, max: 1000 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un nombre de kilomètres valide'),
        check('moyPerKm', 'Veillez saisir une moyenne par kilomètre valide').optional({
            nullable: true,
            checkFalsy: true,
        }),
        check('speedMoy', 'Veillez saisir une vitesse moyenne valide')
            .isFloat({ min: 0, max: 100 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une vitesse moyenne valide'),
        check('speedMax', 'Veillez saisir une vitesse maximale valide')
            .isFloat({ min: 0, max: 100 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une vitesse maximale valide'),
        check('fcMoy', 'Veillez saisir une fréquence cardiaque moyenne valide')
            .isInt({ min: 0, max: 250 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une fréquence cardiaque moyenne valide'),
        check('fcMax', 'Veillez saisir une fréquence cardiaque maximale valide')
            .isInt({ min: 0, max: 250 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une fréquence cardiaque maximale valide'),
        check('hikeUp', 'Veillez saisir un dénivelé positif valide')
            .isInt({ min: 0, max: 10000 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un dénivelé positif valide'),
        check('hikeDown', 'Veillez saisir un dénivelé négatif valide')
            .isInt({ min: 0, max: 10000 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir un dénivelé négatif valide'),
        check('cadenceMoy', 'Veillez saisir une cadence moyenne valide')
            .isInt({ min: 0, max: 250 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une cadence moyenne valide'),
        check('cadenceMax', 'Veillez saisir une cadence maximale valide')
            .isInt({ min: 0, max: 250 })
            .optional({ nullable: true, checkFalsy: true })
            .withMessage('Veillez saisir une cadence maximale valide'),
        check('moyForSwim', 'Veillez saisir une moyenne pour la natation valide').optional({
            nullable: true,
            checkFalsy: true,
        }),
    ];
}
/**
 * 
 //TODO : check if time is valid
            //.isDate({ format: 'HH:mm:ss', delimiters: [':', '/'], strictMode: false })
            /*.custom((value) => {
                const valideDate = new DateUtils().convertTimeToDate(value);
                console.log(valideDate);
                return (
                    valideDate.getHours() < 24 &&
                    valideDate.getMinutes() < 60 &&
                    valideDate.getSeconds() < 60
                );
            })
 */
