import React from 'react';
import { redirect } from 'react-router-dom';
import { ActionFormTraining } from '../util/ActionForm.js';
import { API_call } from '../contexts/API_call.js';
import { FormCreateModifyTraining } from '../components/FormCreateModifyTraining.js';
import Swal from 'sweetalert2';

let isCreate = true;

export async function loader({ request, params }) {
    let result;
    if (params?.idTraining) {
        isCreate = false;
        result = await getTraining({ idTraining: params.idTraining });
    }
    const url = 'getAllTypeOfTraining';
    const method = 'get';
    const response = await API_call(url, method, null);
    if (response.error) {
        return null;
    }
    if (!response.info) {
        return null;
    }
    return { typeOfTraining: response?.info, training: result?.info };
}

export async function action({ param, request }) {
    let formData = await request.formData();
    if (formData.get('idTraining')) {
        const result = await modifyTraining({ formData });
        if (result?.changedRows) {
            Swal.fire({
                icon: 'success',
                title: 'Entrainement modifier',
                text: 'Votre entrainement a été modifier avec succès',
                showConfirmButton: false,
                timer: 2000,
            });
            return redirect('/my-training');
        } else {
            return result;
        }
    } else {
        const result = await addTraining({ formData });
        if (result?.id) {
            Swal.fire({
                icon: 'success',
                title: 'Entrainement créer',
                text: 'Votre entrainement a été créer avec succès',
                showConfirmButton: false,
                timer: 2000,
            });
            return redirect('/my-training');
        } else {
            return result;
        }
    }
}

const addTraining = async ({ formData }) => {
    return await ActionFormTraining(formData, 'createTraining', 'post');
};

const modifyTraining = async ({ formData }) => {
    return await ActionFormTraining(formData, 'updateTraining', 'put');
};

const getTraining = async ({ idTraining }) => {
    const url = 'getTrainingById';
    const method = 'get';
    const param = {
        idTraining: idTraining,
    };
    return await API_call(url, method, param);
};

export const CreateTraining = () => {
    return (
        <>
            <FormCreateModifyTraining formCreate={isCreate} />
        </>
    );
};
