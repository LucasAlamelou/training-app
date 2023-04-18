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
import { filterTrainingValidator } from '../validator/filter_training_validator.js';

export function recapitulatifRoute(app) {
    // Get one parameter
    app.get(
        '/api/recapitulatif/sum-time-training',
        filterTrainingValidator(),
        getRecapHoursTrainingController
    );
    app.get(
        '/api/recapitulatif/sum-distance-training',
        filterTrainingValidator(),
        getRecapDistanceTrainingController
    );
    app.get(
        '/api/recapitulatif/fc-max-training',
        filterTrainingValidator(),
        getRecapFcMaxTrainingController
    );
    app.get(
        '/api/recapitulatif/moy-fc-training',
        filterTrainingValidator(),
        getRecapMoyFcTrainingController
    );
    app.get(
        '/api/recapitulatif/moy-speed-training',
        filterTrainingValidator(),
        getRecapMoySpeedTrainingController
    );
    app.get(
        '/api/recapitulatif/hike-up-training',
        filterTrainingValidator(),
        getRecapHikeUpTrainingController
    );
    app.get(
        '/api/recapitulatif/hike-down-training',
        filterTrainingValidator(),
        getRecapHikeDownTrainingController
    );

    // Get all parameters
    app.get(
        '/api/recapitualtif/all',
        filterTrainingValidator(),
        getRecapAllParametersTrainingController
    );
}
