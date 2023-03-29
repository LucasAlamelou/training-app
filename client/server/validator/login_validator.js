import { check } from 'express-validator';

export function loginValidator() {
    return [
        check('email', 'Veillez saisir un email valide')
            .notEmpty()
            .isEmail()
            .normalizeEmail({
                gmail_lowercase: true,
                outlookdotcom_lowercase: true,
                yahoo_lowercase: true,
                icloud_lowercase: true,
            })
            .withMessage('Veillez saisir un email valide'),
        check('password', 'Veillez saisir un mot de passe valide')
            .notEmpty()
            .isStrongPassword({
                minLength: 5,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage(
                'Veillez saisir un mot de passe contenant au moins 5 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
            ),
    ];
}

export function changePasswordValidator() {
    return [
        check('email', 'Veillez saisir un email valide')
            .notEmpty()
            .isEmail()
            .withMessage('Veillez saisir un email valide'),
        check('password', 'Veillez saisir votre mot de passe valide')
            .notEmpty()
            .isStrongPassword({
                minLength: 5,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage(
                'Veillez saisir votre mot de passe contenant au moins 5 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
            ),
        check('newPassword', 'Veillez saisir un nouveau mot de passe valide')
            .notEmpty()
            .isStrongPassword({
                minLength: 5,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage(
                'Veillez saisir un nouveau mot de passe contenant au moins 5 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
            ),
    ];
}
