import { Router } from 'express';
import { registerController } from '../controllers/register.js';

const router = Router();

export function registerRoute(app) {
    app.post('/api/register', registerController);
}
