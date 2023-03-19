import React from 'react';
import { getLoader } from '../util/Loader.js';
import { AllTraining } from '../pages/AllTraining.js';
import { trainingDeleteAction } from '../util/Action.js';
import Swal from 'sweetalert2';

export async function loader({ request }) {
    const url = 'getAllTraining';
    const method = 'post';
    const result = await getLoader(url, method);
    if (result.error) {
        return result;
    }
    return result.info;
}

export async function action({ param, request }) {
    const formData = await request.formData();
    const result = await trainingDeleteAction(formData.get('idTraining'));
    if (result.error) {
        Swal.fire('Erreur!', 'Une erreur est survenue.', 'error');
        return result;
    }
    return result;
}

export const MyTraining = () => {
    return (
        <>
            <AllTraining />
        </>
    );
};
