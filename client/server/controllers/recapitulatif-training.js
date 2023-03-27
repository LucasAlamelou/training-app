import {
    getSumTimeTrainingByMemberId,
    getSumDistanceTrainingByMemberId,
    getFcMaxTrainingByMemberId,
    getMoyFcTrainingByMemberId,
    getMoySpeedTrainingByMemberId,
    getHikeUpTrainingByMemberId,
    getHikeDownTrainingByMemberId,
    getRecapAllParametersTrainingByMemberId,
} from '../database/filtre-training-data-base.js';

export async function getRecapHoursTrainingController(req, res, next) {
    const { idMember, year, month, day } = req.query;
    try {
        const result = await getSumTimeTrainingByMemberId(idMember, year, month, day);
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

export async function getRecapDistanceTrainingController(req, res, next) {
    const { idMember, year, month, day } = req.query;
    try {
        const result = await getSumDistanceTrainingByMemberId(idMember, year, month, day);
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

export async function getRecapFcMaxTrainingController(req, res, next) {
    const { idMember, year, month, day } = req.query;
    try {
        const result = await getFcMaxTrainingByMemberId(idMember, year, month, day);
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

export async function getRecapMoyFcTrainingController(req, res, next) {
    const { idMember, year, month, day } = req.query;
    try {
        const result = await getMoyFcTrainingByMemberId(idMember, year, month, day);
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

export async function getRecapMoySpeedTrainingController(req, res, next) {
    const { idMember, year, month, day } = req.query;
    try {
        const result = await getMoySpeedTrainingByMemberId(idMember, year, month, day);
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

export async function getRecapHikeUpTrainingController(req, res, next) {
    const { idMember, year, month, day } = req.query;
    try {
        const result = await getHikeUpTrainingByMemberId(idMember, year, month, day);
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

export async function getRecapHikeDownTrainingController(req, res, next) {
    const { idMember, year, month, day } = req.query;
    try {
        const result = await getHikeDownTrainingByMemberId(idMember, year, month, day);
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

export async function getRecapAllParametersTrainingController(req, res, next) {
    const { idMember, year, month, day, idTypeOfTraining } = req.query;
    try {
        const result = await getRecapAllParametersTrainingByMemberId(
            idMember,
            year,
            month,
            day,
            idTypeOfTraining
        );
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
