import { Router } from 'express';
import { loginController, changePassword } from '../controllers/authentification.js';

const router = Router();

export function authentificationRoute(app) {
    app.post('/api/login', loginController);
    app.post('/api/changePassword', changePassword);
}
