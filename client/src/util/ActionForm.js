import { API_call } from '../contexts/API_call.js';
import { validateForm } from './validateForm.js';

/**
 * Action du formulaire
 * @param {Form} formData
 * @param {String} url
 * @param {POST|GET|DELETE} method
 * @returns {object} errors || info {token, id}
 */
export const ActionForm = async (formData, url, method) => {
    let donnesForm = {};
    formData.forEach(function (value, key) {
        donnesForm[key] = value;
    });
    let errors = validateForm(donnesForm);

    if (Object.keys(errors).length) {
        return errors;
    }
    // intern API call
    const response = await API_call(url, method, donnesForm);
    if (response.error) {
        errors = response;
        return errors;
    }
    window.localStorage.setItem('Application_Training_Token', response.info.token);
    window.localStorage.setItem('Application_Training_User', response.info.id);
    // Set l'utilisateur connecté pour tout l'application
    return response.info;
};
