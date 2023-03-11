import { User } from '../models/user.js';
import { Member } from '../models/member.js';
import { createUser, createMember } from '../database/create-on-data-base.js';
import { encryptPassword } from '../util/encrypt_password.js';
import { generateAccessToken } from '../util/generateToken.js';

export async function registerController(req, res) {
    // Register controller
    const { firstName, lastName, dateOfBirth, adress, zipCode, city, country } = req.body;
    const { email, password } = req.body;
    const user = new User(email, password);
    const member = new Member(firstName, lastName, dateOfBirth, adress, zipCode, city, country);
    if (user.validate() && member.validate()) {
        const { hash, salt } = encryptPassword(password);
        user.setHash(hash);
        user.setSalt(salt);
        try {
            const resultUserId = await createUser(user);
            member.setUserId(resultUserId);
            const resultMemberId = await createMember(member);
            const token = generateAccessToken({ email, password: hash, salt });
            res.json({ info: { userId: resultUserId, member, token }, error: null }).status(201);
        } catch (error) {
            console.error(error);
            if (error.code === 'ER_DUP_ENTRY') {
                res.json({ info: null, error: { message: "L'email est déjà utilisé." } }).status(
                    400
                );
            } else if (error.code === 'ER_BAD_NULL_ERROR') {
                res.json({
                    info: null,
                    error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
                }).status(400);
            } else {
                res.json({ error: { message: error.message } }).status(500);
            }
        }
    } else {
        res.json({ info: null, error: { message: "Un champ n'est pas valide." } }).status(400);
    }
}
