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
        return { error: { message: 'Erreur serveur' } };
    }
    if (response.status === 401) {
        console.error("Erreur d'authentification");
        return { error: { message: "Erreur d'authentification" } };
    }
    if (response.data) {
        return response.data;
    }
    return response;
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
        url: `/api/${url}`,
        data: data,
        validateStatus: function (status) {
            return status < 500; // la requête résout tant que le code de sa réponse est
            // inférieur à 500
        },
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
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: window.localStorage.getItem('Application_Training_Token'),
};
