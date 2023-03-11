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

export async function createTrainingComplet(req, res, next) {
    const {
        userId,
        name,
        note,
        along,
        city,
        country,
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
            userId,
            name,
            note,
            along,
            city,
            country,
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
        res.json({ error: { message: error.message } }).status(500);
    }
}

export async function updateTrainingComplet(req, res, next) {
    const {
        idTraining,
        name,
        note,
        along,
        city,
        country,
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
        res.json({ error: { message: error.message } }).status(500);
    }
}
