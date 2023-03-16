import axios from 'axios';

/**
 * Excecute la requête API
 * @param {String} url
 * @param {'POST'|GET|DELETE} method
 * @param {object} data {error: '', info: {}}
 */
export const API_call = async (url, method, data) => {
    const response = await feetchAxios(url, method, data);
    if (response.status > 500) {
        console.error('Erreur serveur');
        return { error: 'Erreur serveur' };
    }
    return response.data;
};

/**
 * Fait la requête axios
 * @param {String} url
 * @param {String} method
 * @param {object} data
 * @returns {object}
 */
const feetchAxios = async (url, method, data) => {
    return await axios({
        headers: headers,
        method: method,
        url: `/${url}`,
        data: data,
    })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
            return error;
        });
};

const headers = {
    'Content-Type': 'application/json',
    Authorization: window.localStorage.getItem('Application_Training_Token'),
};
