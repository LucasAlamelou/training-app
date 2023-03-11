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
    const { hash, salt } = await encryptPassword(password);
    try {
        const result = await createUser(email, hash, salt);
        const token = generateAccessToken({ email, password: hash, salt });
        res.json({ token, id: result }).status(201);
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.json({ error: 'User already exists' }).status(400);
        }
        res.json({ error: error.message }).status(500);
    }
}

export async function createMemberController(req, res, next) {
    const { firstName, lastName, dateOfBirth, adress, city, zipCode, country } = req.body;
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
        res.json({ id: result }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: error.message }).status(500);
    }
}

export async function createHealthMemberController(req, res, next) {
    const { weight, height, hourSleep } = req.body;
    try {
        const result = await createHealthMember(weight, height, hourSleep);
        res.json({ id: result }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: error.message }).status(500);
    }
}

export async function createPerformanceMemberController(req, res, next) {
    const { vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport } = req.body;
    try {
        const result = await createPerformanceMember(
            vo2max,
            seuilLactateFC,
            seuilLactate,
            fcRest,
            fcMax,
            vma,
            favoriteSport
        );
        res.json({ id: result }).status(201);
    } catch (error) {
        console.error(error);
        res.json({ error: error.message }).status(500);
    }
}
