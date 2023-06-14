import axios from 'axios';
import { getDecryptToken } from '../util/Crypto.js';

/**
 * Excecute la requête API
 * @param {String} url
 * @param {'POST'|GET|DELETE} method
 * @param {object} data {error: '', info: {}}
 */
export const API_call = async (url, method, data) => {
    const token = getDecryptToken(
        window.localStorage.getItem('Application_Training_Token_Encrypt'),
        process.env.REACT_APP_TOKEN_STOCKAGE_KEY_FRONT
    );
    let response = {};
    if (method.toLowerCase() === 'get') {
        response = await feetchAxiosGet(url, method, data, token);
    } else {
        response = await feetchAxios(url, method, data, token);
    }

    if (response.status > 500) {
        console.error('Erreur serveur');
        return { error: { message: 'Erreur serveur', code: 500 } };
    }
    if (response.status === 401) {
        console.error("Erreur d'authentification");
        return { error: { message: "Erreur d'authentification", code: 401 } };
    }
    if (response.data) {
        return response.data;
    }
    return response;
};

/**
 * Fait la requête axios POST PUT DELETE
 * @param {String} url
 * @param {String} method
 * @param {object} data
 * @returns {object}
 */
const feetchAxios = async (url, method, data, token) => {
    return await axios({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: token, //window.localStorage.getItem('Application_Training_Token'),
        },
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

/**
 * Fait la requête axios GET
 * @param {String} url
 * @param {String} method
 * @param {object} data
 * @returns {object}
 */
const feetchAxiosGet = async (url, method, data, token) => {
    return await axios({
        headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: token, //window.localStorage.getItem('Application_Training_Token'),
        },
        method: method,
        url: `/api/${url}`,
        params: data,
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
