import {
    createTraining,
    createMetricTraining,
    createMetricHealthTraining,
    createMetricOptionalTraining,
} from '../database/create-on-data-base.js';
import {
    updateTrainingById,
    updateMetricTrainingByIdTraining,
    updateMetricOptionalTraining,
    updateHealthMemberByIdMember,
} from '../database/update-on-data-base.js';
import { deleteTrainingById } from '../database/delete-on-data-base.js';
import {
    getTrainingById,
    getMemberByEmail,
    getAllDataTrainingByMemberId,
    getAllTypeOfTraining,
} from '../database/connection-data-base.js';

/**
 * Permet de gérer la création d'un entrainement complet avec tout les champs
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function createTrainingComplet(req, res, next) {
    const {
        idMember,
        name,
        note,
        along,
        city,
        country,
        date,
        idTypeOfTraining,
        km,
        moyPerKm,
        speedMoy,
        speedMax,
        fcMoy,
        fcMax,
        hikeUp,
        hikeDown,
        cadenceMoy,
        cadenceMax,
        moyForSwim,
    } = req.body;
    try {
        const resultTrainingId = await createTraining(
            idMember,
            name,
            note,
            along,
            city,
            country,
            date,
            idTypeOfTraining
        );
        const resultTrainingMetricsId = await createMetricTraining(
            km,
            moyPerKm,
            speedMoy,
            speedMax,
            resultTrainingId
        );
        const resultTrainingHealthMetricsId = await createMetricHealthTraining(
            fcMoy,
            fcMax,
            resultTrainingId
        );
        const resultTrainingOptionalMetricsId = await createMetricOptionalTraining(
            hikeUp,
            hikeDown,
            cadenceMoy,
            cadenceMax,
            moyForSwim,
            resultTrainingId
        );
        res.json({ info: { id: resultTrainingId }, error: null }).status(201);
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
 * Permet de gérer la mise à jour d'un entrainement complet avec tout les champs
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function updateTrainingComplet(req, res, next) {
    const {
        idTraining,
        name,
        note,
        along,
        city,
        country,
        date,
        idTypeOfTraining,
        km,
        moyPerKm,
        speedMoy,
        speedMax,
        fcMoy,
        fcMax,
        hikeUp,
        hikeDown,
        cadenceMoy,
        cadenceMax,
        moyForSwim,
    } = req.body;
    try {
        const resultTraining = await updateTrainingById(
            idTraining,
            name,
            note,
            along,
            city,
            country,
            date,
            idTypeOfTraining
        );
        const resultTrainingMetrics = await updateMetricTrainingByIdTraining(
            idTraining,
            km,
            moyPerKm,
            speedMoy,
            speedMax
        );
        const resultTrainingHealthMetrics = await updateHealthMemberByIdMember(
            idTraining,
            fcMoy,
            fcMax
        );
        const resultTrainingOptionalMetrics = await updateMetricOptionalTraining(
            idTraining,
            hikeUp,
            hikeDown,
            cadenceMoy,
            cadenceMax,
            moyForSwim
        );
        const infoChanged = {
            changedRows:
                resultTraining.changedRows +
                resultTrainingMetrics.changedRows +
                resultTrainingHealthMetrics.changedRows +
                resultTrainingOptionalMetrics.changedRows,
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
}

/**
 * Permet de gérer la suppression d'un entrainement complet en cascade
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function deleteTrainingComplet(req, res, next) {
    const { idTraining } = req.body;
    try {
        const trainingForDelete = await getTrainingById(idTraining);
        if (!trainingForDelete) {
            res.json({ info: null, error: { message: 'Aucune donnée trouvée' } }).status(404);
            return null;
        }
        const member = await getMemberByEmail(req.user.email);
        if (!member || member.id !== trainingForDelete.idMember) {
            res.json({ info: null, error: { message: "Vous n'avez pas les droits" } }).status(403);
            return null;
        }
        const resultTraining = await deleteTrainingById(idTraining);
        const infoDeleted = {
            affectedRows: resultTraining.affectedRows,
            message: 'Les données ont bien été supprimées',
        };
        res.json({ info: infoDeleted, error: null }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

/**
 * Permet de récupérer toutes les données d'un entrainement complet par son id du membre
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function getAllTrainingController(req, res, next) {
    const { idMember } = req.body;
    try {
        const user = await getMemberByEmail(req.user.email);
        if (!user) {
            res.json({ info: null, error: { message: "L'utilisateur n'existe pas" } }).status(403);
            return null;
        }
        if (user.id !== Number(idMember)) {
            res.json({ info: null, error: { message: "Vous n'avez pas les droits" } }).status(403);
            return null;
        }
        const result = await getAllDataTrainingByMemberId(idMember);
        res.json({ info: { data: result }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function getAllTypeOfTrainingController(req, res, next) {
    try {
        const result = await getAllTypeOfTraining();
        if (!result) {
            res.json({ info: null, error: { message: 'Aucune donnée trouvée.' } }).status(404);
            return null;
        }
        res.json({ info: { data: result }, error: null }).status(200);
    } catch (error) {
        console.error(error);
        res.json({ error: { message: error.message } }).status(500);
    }
}
