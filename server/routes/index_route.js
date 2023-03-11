import { userRoute } from './user.js';
import { authentificationRoute } from './authentification.js';
import { trainingRoute } from './training.js';

export function routes(app) {
    // User routes
    userRoute(app);
    // Authentification routes
    authentificationRoute(app);
    //Training routes
    trainingRoute(app);
}
