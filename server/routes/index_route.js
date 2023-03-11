import { userRoute } from './user.js';
import { authentificationRoute } from './authentification.js';

export function routes(app) {
    // User routes
    userRoute(app);
    // Authentification routes
    authentificationRoute(app);
}
