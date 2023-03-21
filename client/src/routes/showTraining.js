import React from 'react';
import { AllTraining } from '../pages/AllTraining.js';
import { getLoader } from '../util/Loader.js';

export async function loader({ request, params }) {
    const url = 'getTrainingById';
    const method = 'GET';
    const param = {
        idTraining: params.idTraining,
    };
    const result = await getLoader(url, method, param);
    if (!result.info) {
        return result;
    }
    return result.info;
}

export const ShowTraining = () => {
    return (
        <>
            <AllTraining isUniqueTraining={true} />
        </>
    );
};
