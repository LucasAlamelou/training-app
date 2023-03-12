import { Router } from 'express';
import { loginController, changePassword } from '../controllers/authentification.js';

const router = Router();

export function authentificationRoute(app) {
    app.post('/login', loginController);
    app.post('/changePassword', changePassword);
}
