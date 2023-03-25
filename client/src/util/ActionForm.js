import { API_call } from '../contexts/API_call.js';
import { convertFrenchDateToDataBase } from './DateUtils.js';
import { validateForm, validateFormTraining, validateFormMember } from './validateForm.js';

/**
 * Action du formulaire Login et Register
 * @param {Form} formData
 * @param {String} url
 * @param {POST|GET|DELETE} method
 * @param {Int} idValideForm
 * @returns {object} errors || info {token, id}
 */
export const ActionFormLoginRegister = async (formData, url, method) => {
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
    return response.info;
};

/**
 * Action du formulaire de création et modification d'un entrainement
 * @param {Form} formData
 * @param {String} url
 * @param {POST|GET|DELETE} method
 * @returns {object} errors {message : '', champ : ''} || info {id}
 */
export const ActionFormTraining = async (formData, url, method) => {
    let donnesForm = {};
    formData.forEach(function (value, key) {
        if (!value) {
            donnesForm[key] = null;
        } else {
            donnesForm[key] = value;
        }
    });

    let errors = validateFormTraining(donnesForm);

    if (Object.keys(errors).length) {
        return errors;
    }
    donnesForm.idMember = window.localStorage.getItem('Application_Training_Member');
    // intern API call
    const response = await API_call(url, method, donnesForm);
    if (response.error) {
        errors = response;
        return errors;
    }
    return response.info;
};

export const ActionFormMember = async (memberState, data) => {
    const url = 'updateMemberAllField';
    const method = 'put';
    const member = { ...memberState, ...data };
    if (data?.dateOfBirth) {
        member.dateOfBirth = convertFrenchDateToDataBase(member.dateOfBirth);
    } else {
        const date = new Date(member.dateOfBirth);
        member.dateOfBirth = date.toISOString().split('T')[0];
    }
    let errors = validateFormMember(member);
    if (Object.keys(errors).length) {
        return { error: errors };
    }

    console.log(member);
    const result = await API_call(url, method, member);
    if (result.error) {
        return result;
    }
    return result.info;
};
