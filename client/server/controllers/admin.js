import { getUsers, getMembers } from '../database/connection-data-base.js';
import { countTrainingByMemberId } from '../database/count-on-data-base.js';
import { asErrorValidator } from '../validator/errors_validator.js';

export const getUsersAdminControllers = async (req, res) => {
    try {
        const users = await getUsers();
        res.json({ info: users }).status(200);
    } catch (error) {
        res.json({ error: { message: error.message } }).status(500);
    }
};

export const getMembersAdminControllers = async (req, res) => {
    try {
        const members = await getMembers();
        res.json({ info: members }).status(200);
    } catch (error) {
        res.json({ error: { message: error.message } }).status(500);
    }
};

export const getCountTrainingByMemberIdControllers = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const idMember = Number(req.query.idMember);
        if (!idMember) {
            res.json({ error: { message: 'idMember est manquant' } }).status(400);
            return null;
        }
        const count = await countTrainingByMemberId(idMember);
        res.json({ info: count }).status(200);
    } catch (error) {
        res.json({ error: { message: error.message } }).status(500);
    }
};

export const postUsersAdminControllers = async (req, res) => {
    res.json({ info: 'postUsersAdminControllers' }).status(200);
};
