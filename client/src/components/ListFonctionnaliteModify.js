import React from 'react';
import { SimplemdeInput } from './SimplemdeInput.js';
import { useSubmit, useLoaderData } from 'react-router-dom';
import { ACTION_MODIFY_FONCTIONNALITE, ACTION_ADD_FONCTIONNALITE } from '../pages/AdminPage.js';

export const FonctionnaliteModifyOrAdd = ({ isAddOrModify }) => {
    const submit = useSubmit();
    const data = useLoaderData();
    const fonctionnalite = data;
    const onSaveFonctionnalite = (id, description, name) => {
        if (!id) {
            const action = ACTION_ADD_FONCTIONNALITE;
            submit({ actionMethod: action, description, name }, { method: 'post' });
        } else {
            const action = ACTION_MODIFY_FONCTIONNALITE;
            submit({ id: id, description, name, actionMethod: action }, { method: 'put' });
        }
    };

    return (
        <>
            {isAddOrModify && (
                <SimplemdeInput
                    value={fonctionnalite?.description}
                    nameFonctionnalite={fonctionnalite?.name}
                    key={`fonctionnalite_MDE_${fonctionnalite?.id}`}
                    id={fonctionnalite?.id}
                    onClick={onSaveFonctionnalite}
                />
            )}
        </>
    );
};
