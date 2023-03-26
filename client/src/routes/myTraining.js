import React from 'react';
import { getLoader } from '../util/Loader.js';
import { AllTraining } from '../pages/AllTraining.js';
import { deleteAction } from '../util/Action.js';
import Swal from 'sweetalert2';

export async function loader({ request }) {
    const url = 'getAllTraining';
    const method = 'POST';
    const param = {
        idMember: window.localStorage.getItem('Application_Training_Member'),
    };
    const result = await getLoader(url, method, param);
    if (!result.info) {
        return result;
    }
    return result.info;
}

export async function action({ param, request }) {
    const formData = await request.formData();
    const url = 'deleteTraining';
    const result = await deleteAction({ idTraining: formData.get('idTraining') }, url);
    if (result.error) {
        Swal.fire('Erreur!', 'Une erreur est survenue.', 'error');
        return result;
    }
    return result;
}

export const MyTraining = () => {
    return (
        <>
            <AllTraining isUniqueTraining={false} />
        </>
    );
};
