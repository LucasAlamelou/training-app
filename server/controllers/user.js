import { encryptPassword } from '../util/encrypt_password.js';
import {
    createUser,
    createMember,
    createHealthMember,
    createPerformanceMember,
} from '../database/create-on-data-base.js';
import {
    updateMemberById,
    updateHealthMemberByIdMember,
    updatePerformanceMemberByIdMember,
} from '../database/update-on-data-base.js';
import { deleteUserById } from '../database/delete-on-data-base.js';
import {
    getUserById,
    getMemberById,
    getMemberCompletById,
    getUserAndMemberById,
} from '../database/connection-data-base.js';
import { countTrainingByMemberId } from '../database/count-on-data-base.js';
import { generateAccessToken } from '../util/generateToken.js';
import { asErrorValidator } from '../validator/errors_validator.js';

const ROLE_ADMIN = 'ROLE_ADMIN';

/**
 * Permet de gérer la création d'un utilisateur
 * Table user uniquement
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function createUserController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { email, password } = req.body;
    const { hash, salt } = await encryptPassword(password);
    try {
        const result = await createUser(email, hash, salt);
        const token = generateAccessToken({ email, password: hash, salt });
        res.json({ info: { id: result, token }, error: null }).status(201);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.json({ info: null, error: { message: "L'email est déjà utilisé." } }).status(400);
        } else if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        } else {
            res.json({ error: { message: error.message } }).status(500);
        }
    }
}

/**
 * Permet de gérer la création d'un membre
 * Table member uniquement
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function createMemberController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { userId, firstName, lastName, dateOfBirth, adress, city, zipCode, country } = req.body;
    try {
        const result = await createMember(
            userId,
            firstName,
            lastName,
            dateOfBirth,
            adress,
            city,
            zipCode,
            country
        );
        res.json({ info: { id: result }, error: null }).status(201);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        } else {
            res.json({ error: { message: error.message } }).status(500);
        }
    }
}

/**
 * Permet de gérer la création des données de santé d'un membre
 * Table health uniquement
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function createHealthMemberController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { idMember, weight, height, hourSleep } = req.body;
    try {
        const result = await createHealthMember(idMember, weight, height, hourSleep);
        res.json({ info: { id: result }, error: null }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

/**
 * Permet de gérer la création des données de performance d'un membre
 * Table performance uniquement
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function createPerformanceMemberController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { idMember, vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport } =
        req.body;
    try {
        const result = await createPerformanceMember(
            idMember,
            vo2max,
            seuilLactateFC,
            seuilLactate,
            fcRest,
            fcMax,
            vma,
            favoriteSport
        );
        res.json({ info: { id: result }, error: null }).status(201);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        } else {
            res.json({ error: { message: error.message } }).status(500);
        }
    }
}

export async function updateMemberAllFieldController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const {
        idMember,
        firstName,
        lastName,
        dateOfBirth,
        adress,
        city,
        zipCode,
        country,
        weight,
        height,
        hourSleep,
        vo2max,
        seuilLactateFC,
        seuilLactate,
        fcRest,
        fcMax,
        vma,
        favoriteSport,
    } = req.body;
    try {
        const result = await updateMemberById(
            idMember,
            firstName,
            lastName,
            dateOfBirth,
            adress,
            city,
            zipCode,
            country
        );
        const resultHealthMember = await updateHealthMemberByIdMember(
            idMember,
            weight,
            height,
            hourSleep
        );
        const resultPerformanceMember = await updatePerformanceMemberByIdMember(
            idMember,
            vo2max,
            seuilLactateFC,
            seuilLactate,
            fcRest,
            fcMax,
            vma,
            favoriteSport
        );
        if (
            result.affectedRows === 0 ||
            resultHealthMember.affectedRows === 0 ||
            resultPerformanceMember.affectedRows === 0
        ) {
            res.json({ info: null, error: { message: "Le membre n'existe pas" } }).status(400);
            return;
        }
        const infoChanged = {
            changedRows:
                result.changedRows +
                resultHealthMember.changedRows +
                resultPerformanceMember.changedRows,
            message: 'Les données ont bien été modifiées.',
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        } else {
            res.json({ error: { message: error.message } }).status(500);
        }
    }
}

/**
 * Permet de gérer la modification de la table member
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function updateMemberController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { idMember, firstName, lastName, dateOfBirth, adress, city, zipCode, country } = req.body;
    try {
        const result = await updateMemberById(
            idMember,
            firstName,
            lastName,
            dateOfBirth,
            adress,
            city,
            zipCode,
            country
        );
        if (result.affectedRows === 0) {
            res.json({ info: null, error: { message: "Le membre n'existe pas" } }).status(400);
            return;
        }
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées.',
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        } else {
            res.json({ error: { message: error.message } }).status(500);
        }
    }
}

/**
 * Permet la modifcation de la table santé du membre
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function updateHealthMemberController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { idMember, weight, height, hourSleep } = req.body;
    try {
        const result = await updateHealthMemberByIdMember(idMember, weight, height, hourSleep);
        if (result.affectedRows === 0) {
            res.json({ info: null, error: { message: "Le membre n'existe pas." } }).status(400);
            return;
        }
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées.',
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        } else {
            res.json({ error: { message: error.message } }).status(500);
        }
    }
}

/**
 * Permet la modification de la table performance du membre
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function updatePerformanceMemberController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const { idMember, vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport } =
        req.body;
    try {
        const result = await updatePerformanceMemberByIdMember(
            idMember,
            vo2max,
            seuilLactateFC,
            seuilLactate,
            fcRest,
            fcMax,
            vma,
            favoriteSport
        );
        if (result.affectedRows === 0) {
            res.json({ info: null, error: { message: "Le membre n'existe pas." } }).status(400);
            return;
        }
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées.',
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        } else {
            res.json({ error: { message: error.message } }).status(500);
        }
    }
}

/**
 * Supprime un utilisateur de la base de données en fonction de son id member ou de son id user
 * Supprime également le membre associé en cascade
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function deleteUserController(req, res, next) {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const roles = req.user.roles;
    const { idMember, idUser } = req.body;
    if (!idMember && !idUser) {
        res.json({ info: null, error: { message: "Aucun id n'a été renseigné." } }).status(400);
        return;
    }
    try {
        let user;
        if (idMember) {
            const member = await getMemberById(idMember);
            if (!member) {
                res.json({ info: null, error: { message: "Le membre n'existe pas." } }).status(400);
                return;
            }
            user = await getUserById(member.userId);
            if (!user) {
                res.json({ info: null, error: { message: "L'utilisateur n'existe pas." } }).status(
                    400
                );
                return;
            }
            if (!roles.includes(ROLE_ADMIN)) {
                res.json({
                    info: null,
                    error: { message: "Vous n'avez pas les droits pour supprimer ce membre." },
                }).status(400);
                return;
            }
        }

        if (idUser) {
            user = await getUserById(idUser);
            if (!user) {
                res.json({ info: null, error: { message: "L'utilisateur n'existe pas." } }).status(
                    400
                );
                return;
            }
            if (!roles.includes(ROLE_ADMIN)) {
                res.json({
                    info: null,
                    error: { message: "Vous n'avez pas les droits pour supprimer ce membre." },
                }).status(400);
                return;
            }
        }

        const result = await deleteUserById(user.id);
        if (result.affectedRows === 0) {
            res.json({ info: null, error: { message: 'Aucune données effacé.' } }).status(400);
            return;
        }
        const infoChanged = {
            changedRows: result.changedRows,
            message: `L\'utilisateur ${user.email} a bien été supprimé.`,
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

/**
 * Récupère les informations du membre en fonction de son id de membre
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const getMemberController = async (req, res, next) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const { idMember } = req.query;
        const member = await getMemberCompletById(idMember);
        if (!member) {
            res.json({ info: null, error: { message: "Le membre n'existe pas." } }).status(400);
            return;
        }
        res.json({ info: { member }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
};

export const getUserAndMemberAllController = async (req, res, next) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    const roles = req.user.roles;
    if (!roles.includes(ROLE_ADMIN)) {
        res.json({
            info: null,
            error: { message: "Vous n'avez pas les droits pour accéder à cette page." },
        }).status(400);
        return;
    }
    const { idMember, idUser } = req.query;
    if (!idMember && !idUser) {
        res.json({ info: null, error: { message: "Aucun id n'a été renseigné." } }).status(400);
        return;
    }
    try {
        let user;
        if (idMember) {
            const member = await getMemberById(idMember);
            if (!member) {
                res.json({ info: null, error: { message: "Le membre n'existe pas." } }).status(400);
                return;
            }
            user = await getUserAndMemberById(member.userId);
            if (!user) {
                res.json({ info: null, error: { message: "L'utilisateur n'existe pas." } }).status(
                    400
                );
                return;
            }
        }
        if (idUser) {
            user = await getUserAndMemberById(idUser);
            if (!user) {
                res.json({ info: null, error: { message: "L'utilisateur n'existe pas." } }).status(
                    400
                );
                return;
            }
        }
        const nbTraining = await countTrainingByMemberId(idMember ? idMember : idUser);
        const data = {
            ...user,
            ...nbTraining,
        };
        res.json({ info: { member: data }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
};
