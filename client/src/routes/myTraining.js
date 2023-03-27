import React from 'react';
import { getLoader } from '../util/Loader.js';
import { AllTraining } from '../pages/AllTraining.js';
import { deleteAction } from '../util/Action.js';
import Swal from 'sweetalert2';

export async function loader({ request }) {
    const url = 'getAllTraining';
    const urlTypeSport = 'getAllTypeOfTraining';
    const methodGet = 'GET';
    const methodPost = 'POST';
    const param = {
        idMember: window.localStorage.getItem('Application_Training_Member'),
    };
    const result = await getLoader(url, methodPost, param);
    const resultTypeSport = await getLoader(urlTypeSport, methodGet);
    // TODO recup type sport pour le filtre
    if (!result.info || !resultTypeSport.info) {
        return result;
    }
    return { training: result.info, typeOfTraining: resultTypeSport.info };
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
