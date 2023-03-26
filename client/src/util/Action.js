import { API_call } from '../contexts/API_call.js';

export const deleteAction = async (data, url) => {
    const method = 'delete';
    const result = await API_call(url, method, data);
    if (result.error) {
        return result;
    }
    return result.info;
};
