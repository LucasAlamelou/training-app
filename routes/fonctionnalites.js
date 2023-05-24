import { getFonctionnaliteActive } from '../controllers/fonctionnalites.js';

export function fonctionnalitesRoute(app) {
    // get routes
    app.get('/api/getFonctionnalitesActive', getFonctionnaliteActive);
}
