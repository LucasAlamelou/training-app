import { decryptPassword } from '../util/decrypt_password.js';
import { encryptPassword } from '../util/encrypt_password.js';
import { generateAccessToken } from '../util/generateToken.js';
import { getUserByEmail } from '../database/connection-data-base.js';
import { updateUserPasswordById } from '../database/update-on-data-base.js';
import { User } from '../models/user.js';
import { asErrorValidator } from '../validator/errors_validator.js';

/**
 * Permet de gérer la connexion d'un utilisateur
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function loginController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            res.json({ error: { message: 'Utilisateur inconnu' }, info: null }).status(401);
            return;
        }
        const { hash, salt } = user;
        const result = decryptPassword(salt, hash, password);
        if (result) {
            const token = generateAccessToken({
                email,
                password: hash,
                salt,
                id: user.userId,
                roles: user.roles,
            });
            res.json({
                info: { token, id: user.userId, idMember: user.id, roles: user.roles, email },
            }).status(200);
        } else {
            res.json({ error: { message: 'Mot de passe invalide' }, info: null }).status(401);
        }
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

/**
 * Permet de gérer la modification du mot de passe d'un utilisateur
 * Lui uniquement peut le faire
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function changePassword(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { email, password, newPassword } = req.body;
    const user = new User(email, newPassword);
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            res.json({ error: { message: 'Utilisateur non trouvé' }, info: null }).status(404);
            return;
        } else if (user.email !== req.user.email) {
            res.json({
                error: { message: "Vous n'avez pas les droits pour modifier ce mot de passe" },
                info: null,
            }).status(401);
            return;
        }
        const { hash, salt } = user;
        const actualPassword = decryptPassword(salt, hash, password);
        if (actualPassword) {
            if (!new User(email, newPassword).validate()) {
                res.json({
                    error: { message: 'Nouveau mot de passe invalide' },
                    info: null,
                }).status(401);
                return;
            }
            const { salt, hash } = encryptPassword(newPassword);
            const result = await updateUserPasswordById(user.id, hash, salt);
            const infoChanged = {
                changedRows: result.changedRows,
                message: 'Le mot de passe a bien été modifiées.',
            };
            res.json({ info: infoChanged, error: null }).status(200);
        } else {
            res.json({ error: { message: 'Mot de passe invalide' }, info: null }).status(401);
        }
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}
