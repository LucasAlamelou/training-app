import { API_call } from '../contexts/API_call.js';

/**
 *  Récupère les données de l'API par le biais de la fonction API_call
 *  Loader avec idMember set dans le body de la requête
 * @param {String} url
 * @param {POST|GET} method
 * @returns {object} error : {message : '', champ : ''} || info {data: []}
 */
export const getLoader = async (url, method, param) => {
    const result = await API_call(url, method, param);
    return result;
};
