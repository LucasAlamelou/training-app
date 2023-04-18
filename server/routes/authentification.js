import { Router } from 'express';
import { loginController, changePassword } from '../controllers/authentification.js';
import { loginValidator, changePasswordValidator } from '../validator/login_validator.js';

const router = Router();

export function authentificationRoute(app) {
    app.post('/api/login', loginValidator(), loginController);
    app.post('/api/changePassword', changePasswordValidator(), changePassword);
}
