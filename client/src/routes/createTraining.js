import React from 'react';
import { redirect } from 'react-router-dom';
import { ActionFormTraining } from '../util/ActionForm.js';
import { API_call } from '../contexts/API_call.js';
import { FormCreateModifyTraining } from '../components/FormCreateModifyTraining.js';
import Swal from 'sweetalert2';

export async function loader({ request }) {
    const url = 'getAllTypeOfTraining';
    const method = 'get';
    const response = await API_call(url, method, null);
    if (response.error) {
        return null;
    }
    if (!response.info) {
        return null;
    }
    return response.info;
}

export async function action({ param, request }) {
    let formData = await request.formData();
    const result = await ActionFormTraining(formData, 'createTraining', 'post');
    if (result.id) {
        Swal.fire({
            icon: 'success',
            title: 'Entrainement créer',
            text: 'Votre entrainement a été créer avec succès',
            showConfirmButton: false,
            timer: 2000,
        });
        return redirect('/my-training');
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
