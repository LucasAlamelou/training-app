import { Router } from 'express';
import { loginController } from '../controllers/authentification.js';

const router = Router();

export function authentificationRoute(app) {
    app.post('/login', loginController);
}
