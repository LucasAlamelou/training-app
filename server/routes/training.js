import { Router } from 'express';
import {
    createTrainingComplet,
    updateTrainingComplet,
    deleteTrainingComplet,
} from '../controllers/training.js';

const router = Router();

export function trainingRoute(app) {
    app.post('/createTraining', createTrainingComplet);
    app.post('/updateTraining', updateTrainingComplet);
    app.delete('/deleteTraining', deleteTrainingComplet);
}
