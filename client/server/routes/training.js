import { Router } from 'express';
import {
    createTrainingComplet,
    updateTrainingComplet,
    deleteTrainingComplet,
    getAllTrainingController,
    getAllTypeOfTrainingController,
} from '../controllers/training.js';

const router = Router();

export function trainingRoute(app) {
    app.post('/api/createTraining', createTrainingComplet);
    app.post('/api/updateTraining', updateTrainingComplet);
    app.delete('/api/deleteTraining', deleteTrainingComplet);
    app.post('/api/getAllTraining', getAllTrainingController);
    app.get('/api/getAllTypeOfTraining', getAllTypeOfTrainingController);
}
