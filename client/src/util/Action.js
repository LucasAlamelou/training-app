import { API_call } from '../contexts/API_call.js';

export const trainingDeleteAction = async (idTraining) => {
    const url = 'deleteTraining';
    const method = 'delete';
    const result = await API_call(url, method, { idTraining });
    if (result.error) {
        return result;
    }
    return result.info;
};
