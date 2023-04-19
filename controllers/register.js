import { User } from '../models/user.js';
import { Member } from '../models/member.js';
import { createUser, createMember } from '../database/create-on-data-base.js';
import { getMemberByEmail, getUserById } from '../database/connection-data-base.js';
import { encryptPassword } from '../util/encrypt_password.js';
import { generateAccessToken } from '../util/generateToken.js';
import { asErrorValidator } from '../validator/errors_validator.js';

/**
 * Permet de gérer l'inscription d'un utilisateur
 * Ajout de l'user et member
 * @param {*} req
 * @param {*} res
 */
export async function registerController(req, res) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
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
            member.setMemberId(resultMemberId);
            const resultUser = await getUserById(resultUserId);
            const resultMember = await getMemberByEmail(email);
            const token = generateAccessToken({
                email,
                password: hash,
                salt,
                id: resultUserId,
                roles: resultUser.roles,
            });
            res.json({
                info: {
                    token,
                    id: resultUserId,
                    idMember: resultMember.id,
                    roles: user.roles,
                    email,
                    member: {
                        id: resultMember.id,
                        firstName: resultMember.firstName,
                        lastName: resultMember.lastName,
                        email: resultMember.email,
                        adress: resultMember.adress,
                        city: resultMember.city,
                        zipCode: resultMember.zipCode,
                        country: resultMember.country,
                        dateOfBirth: resultMember.dateOfBirth,
                    },
                },
                error: null,
            }).status(201);
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
