import { encryptPassword } from '../util/encrypt_password.js';
import {
    createUser,
    createMember,
    createHealthMember,
    createPerformanceMember,
} from '../database/create-on-data-base.js';
import { generateAccessToken } from '../util/generateToken.js';

export async function createUserController(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
    const { hash, salt } = await encryptPassword(password);
    try {
        const result = await createUser(email, hash, salt);
        const token = generateAccessToken({ email, password: hash, salt });
        res.json({ token, info: { id: result } }).status(201);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.json({ info: null, error: "L'email est déjà utiliser" }).status(400);
        }
        res.json({ error: error.message }).status(500);
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
        res.json({ info: { id: result } }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: error.message }).status(500);
    }
}

export async function createHealthMemberController(req, res, next) {
    const { idMember, weight, height, hourSleep } = req.body;
    try {
        const result = await createHealthMember(idMember, weight, height, hourSleep);
        res.json({ info: { id: result } }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: error.message }).status(500);
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
        res.json({ info: { id: result } }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: error.message }).status(500);
    }
}
