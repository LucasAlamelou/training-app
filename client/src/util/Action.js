import { API_call } from '../contexts/API_call.js';

export const deleteAction = async (data, url) => {
    const method = 'delete';
    const result = await API_call(url, method, data);
    if (result.error) {
        return result;
    }
    return result.info;
};

export const modifyAction = async (data, url) => {
    const method = 'put';
    const result = await API_call(url, method, data);
    if (result.error) {
        return result;
    }
    return result.info;
};

export const addAction = async (data, url) => {
    const method = 'post';
    const result = await API_call(url, method, data);
    if (result.error) {
        return result;
    }
    return result.info;
};
