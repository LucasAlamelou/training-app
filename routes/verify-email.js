import { validEmailUser } from '../controllers/verify-email.js';
import { tokenValidator } from '../validator/token_validator.js';

export function verifyEmailRoute(app) {
    app.get('/api/verify-email', tokenValidator(), validEmailUser);
}
