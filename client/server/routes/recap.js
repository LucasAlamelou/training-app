import {
    getRecapDistanceTrainingController,
    getRecapFcMaxTrainingController,
    getRecapHikeDownTrainingController,
    getRecapHikeUpTrainingController,
    getRecapHoursTrainingController,
    getRecapMoyFcTrainingController,
    getRecapMoySpeedTrainingController,
    getRecapAllParametersTrainingController,
} from '../controllers/recapitulatif-training.js';

export function recapitulatifRoute(app) {
    // Get one parameter
    app.get('/api/recapitulatif/sum-time-training', getRecapHoursTrainingController);
    app.get('/api/recapitulatif/sum-distance-training', getRecapDistanceTrainingController);
    app.get('/api/recapitulatif/fc-max-training', getRecapFcMaxTrainingController);
    app.get('/api/recapitulatif/moy-fc-training', getRecapMoyFcTrainingController);
    app.get('/api/recapitulatif/moy-speed-training', getRecapMoySpeedTrainingController);
    app.get('/api/recapitulatif/hike-up-training', getRecapHikeUpTrainingController);
    app.get('/api/recapitulatif/hike-down-training', getRecapHikeDownTrainingController);

    // Get all parameters
    app.get('/api/recapitualtif/all', getRecapAllParametersTrainingController);
}
