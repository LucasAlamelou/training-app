import React from 'react';
import { redirect } from 'react-router-dom';
import { ActionFormTraining } from '../util/ActionForm.js';
import { API_call } from '../contexts/API_call.js';
import { FormCreateModifyTraining } from '../components/FormCreateModifyTraining.js';

export async function loader({ request }) {
    const url = 'getTypeOfTraining';
    const method = 'get';
    //const response = await API_call(url, method, null);
    const response = {
        info: {
            typeOfTraining: [
                { id: 1, name: 'Course' },
                { id: 2, name: 'Vélo' },
                { id: 3, name: 'Natation' },
            ],
        },
    };
    if (response.error) {
        return null;
    }
    return response.info;
}

export async function action({ param, request }) {
    let formData = await request.formData();
    const result = await ActionFormTraining(formData, 'createTraining', 'post');
    if (result.id) {
        return redirect('/home');
    }
    return result;
}

export const CreateTraining = () => {
    const isCreate = true;
    return (
        <>
            <FormCreateModifyTraining formCreate={isCreate} />
        </>
    );
};
