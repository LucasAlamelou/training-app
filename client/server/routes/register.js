import { Router } from 'express';
import { registerController } from '../controllers/register.js';
import { memberValidator } from '../validator/member_validator.js';
import { loginValidator } from '../validator/login_validator.js';

const router = Router();

export function registerRoute(app) {
    app.post('/api/register', memberValidator(), loginValidator(), registerController);
}
