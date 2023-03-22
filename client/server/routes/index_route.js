import { userRoute } from './user.js';
import { authentificationRoute } from './authentification.js';
import { trainingRoute } from './training.js';
import { registerRoute } from './register.js';
import { recapitulatifRoute } from './recap.js';

export function routes(app) {
    // User routes
    userRoute(app);
    // Authentification routes
    authentificationRoute(app);
    // Register routes
    registerRoute(app);
    //Training routes
    trainingRoute(app);
    //Recapitulatif routes
    recapitulatifRoute(app);
}
