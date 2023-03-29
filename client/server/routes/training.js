import { Router } from 'express';
import {
    createTrainingComplet,
    updateTrainingComplet,
    deleteTrainingComplet,
    getAllTrainingController,
    getAllTypeOfTrainingController,
    getTrainingByIdController,
} from '../controllers/training.js';
import { idTrainingValidator } from '../validator/id_validator.js';
import { trainingValidator } from '../validator/training_validator.js';

const router = Router();

export function trainingRoute(app) {
    app.post('/api/createTraining', trainingValidator(), createTrainingComplet);
    app.post('/api/updateTraining', trainingValidator(), updateTrainingComplet);
    app.delete('/api/deleteTraining', idTrainingValidator(), deleteTrainingComplet);
    app.post('/api/getAllTraining', getAllTrainingController);
    app.get('/api/getAllTypeOfTraining', getAllTypeOfTrainingController);
    app.get('/api/getTrainingById', idTrainingValidator(), getTrainingByIdController);
}
