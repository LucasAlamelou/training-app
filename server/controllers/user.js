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
import { generateAccessToken } from '../util/generateToken.js';

export async function createUserController(req, res, next) {
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
        }
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function createMemberController(req, res, next) {
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
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function createHealthMemberController(req, res, next) {
    const { idMember, weight, height, hourSleep } = req.body;
    try {
        const result = await createHealthMember(idMember, weight, height, hourSleep);
        res.json({ info: { id: result }, error: null }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function createPerformanceMemberController(req, res, next) {
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
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function updateMemberController(req, res, next) {
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
        }
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées.',
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        }
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function updateHealthMemberController(req, res, next) {
    const { idMember, weight, height, hourSleep } = req.body;
    try {
        const result = await updateHealthMemberByIdMember(idMember, weight, height, hourSleep);
        if (result.affectedRows === 0) {
            res.json({ info: null, error: { message: "Le membre n'existe pas." } }).status(400);
        }
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées.',
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        }
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function updatePerformanceMemberController(req, res, next) {
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
        }
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées.',
        };
        res.json({ info: { infoChanged }, error: null }).status(200);
    } catch (error) {
        if (error.code === 'ER_BAD_NULL_ERROR') {
            res.json({
                info: null,
                error: { message: 'Un champ ne peut être null.', champ: error.sqlMessage },
            }).status(400);
        }
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}
