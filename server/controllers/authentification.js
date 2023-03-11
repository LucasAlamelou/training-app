import { decryptPassword } from '../util/decrypt_password.js';
import { encryptPassword } from '../util/encrypt_password.js';
import { generateAccessToken } from '../util/generateToken.js';
import { getUserByEmail } from '../database/connection-data-base.js';
import { updateUserPasswordById } from '../database/update-on-data-base.js';

export async function loginController(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        const { hash, salt } = user;
        const result = await decryptPassword(password, hash, salt);
        if (result) {
            const token = generateAccessToken({ email, password: hash, salt });
            res.json({ info: { token, id: user.id } }).status(200);
        } else {
            res.json({ error: { message: 'Mot de passe invalide' }, info: null }).status(401);
        }
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function changePassword(req, res, next) {
    const { email, password, newPassword } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            res.json({ error: { message: 'Utilisateur non trouvé' }, info: null }).status(404);
        }
        const { hash, salt } = user;
        const actualPassword = decryptPassword(password, hash, salt);
        if (actualPassword) {
            const { newSalt, newHash } = encryptPassword(newPassword);
            const result = await updateUserPasswordById(user.id, newHash, newSalt);
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
