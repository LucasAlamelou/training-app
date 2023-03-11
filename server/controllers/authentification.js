import { decryptPassword } from '../util/decrypt_password.js';
import { generateAccessToken } from '../util/generateToken.js';

export async function loginController(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await getUser(email);
        const { hash, salt } = user;
        const result = await decryptPassword(password, hash, salt);
        if (result) {
            const token = generateAccessToken({ email, password: hash, salt });
            res.json({ token, id: user.id }).status(200);
        } else {
            res.json({ error: 'Mot de passe invalide' }).status(401);
        }
    } catch (error) {
        console.error(error);
        res.json({ error: error.message }).status(500);
    }
}
