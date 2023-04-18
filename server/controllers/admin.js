import {
    getUsers,
    getMembers,
    getAllFonctionnalites,
    getFonctionnalitesById,
} from '../database/connection-data-base.js';
import { createFonctionnalite } from '../database/create-on-data-base.js';
import {
    updateFonctionnaliteById,
    updateFonctionnaliteActiveById,
} from '../database/update-on-data-base.js';
import { countTrainingByMemberId } from '../database/count-on-data-base.js';
import { deleteFonctionnaliteById } from '../database/delete-on-data-base.js';
import { asErrorValidator } from '../validator/errors_validator.js';
import { registerController } from './register.js';

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

export const addMemberAdminControllers = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }

    // Genrateur de mot de passe? https://www.npmjs.com/package/password-generator
    // Si le mot de passe est vide, on génère un mot de passe aléatoire

    registerController(req, res);
};

export const getFonctionnalitesControllers = async (req, res) => {
    try {
        const fonctionnalites = await getAllFonctionnalites();
        res.json({ info: fonctionnalites }).status(200);
    } catch (error) {
        res.json({ error: { message: error.message } }).status(500);
    }
};

export const addFonctionnaliteControllers = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const name = req.body.name;
        const description = req.body.description;
        const createDate = req.body.createDate ? req.body.createDate : new Date();
        const isActive = req.body.isActive ? req.body.isActive : false;
        const result = await createFonctionnalite(description, name, createDate, isActive);
        res.json({
            info: { id: result, fonctionnalite: { name, description, createDate, isActive } },
            error: null,
        }).status(201);
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
};

export const updateFonctionnaliteControllers = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const idFonctionnalite = Number(req.body.idFonctionnalite);
        const isActive = req.body.isActive ? req.body.isActive : false;
        const name = req.body.name;
        const description = req.body.description;
        const updateDate = req.body.updateDate ? req.body.updateDate : new Date();

        const result = await updateFonctionnaliteById(
            idFonctionnalite,
            name,
            description,
            updateDate,
            isActive
        );
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées',
        };
        res.json({ info: infoChanged, error: null }).status(200);
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
};

export const setFonctionnaliteActiveControllers = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const idFonctionnalite = Number(req.body.idFonctionnalite);
        const isActive = req.body.isActive;
        const updateDate = req.body.updateDate ? req.body.updateDate : new Date();
        const result = await updateFonctionnaliteActiveById(idFonctionnalite, isActive, updateDate);
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été modifiées',
        };
        res.json({ info: infoChanged, error: null }).status(200);
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
};

export const deleteFonctionnaliteControllers = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const idFonctionnalite = Number(req.body.idFonctionnalite);
        const result = await deleteFonctionnaliteById(idFonctionnalite);
        const infoChanged = {
            changedRows: result.changedRows,
            message: 'Les données ont bien été supprimées',
        };
        res.json({ info: infoChanged, error: null }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
};

export const getFonctionnaliteByIdControllers = async (req, res) => {
    const errorValidator = asErrorValidator(req, res);
    if (errorValidator) {
        return;
    }
    try {
        const idFonctionnalite = Number(req.query.idFonctionnalite);
        const fonctionnalite = await getFonctionnalitesById(idFonctionnalite);
        res.json({ info: fonctionnalite }).status(200);
    } catch (error) {
        res.json({ error: { message: error.message } }).status(500);
    }
};
