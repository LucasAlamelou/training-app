import React from 'react';
import styled from 'styled-components';
import { FormTraining } from './FormTraining.js';

export const FormCreateModifyTraining = ({ formCreate }) => {
    const [isCreate] = React.useState(formCreate);
    return (
        <>
            <H2>{isCreate ? 'Ajouter un entraînement' : 'Modifier un entraînement'}</H2>
            <DivForm>
                <FormTraining />
            </DivForm>
        </>
    );
};

const DivForm = styled.div`
    margin: 0 auto;
    margin-top: 2rem;
    width: 75%;
    height: 80%;
    padding: 1rem;
    background-color: #fff;
    border: 2px solid #0554f2;
    border-radius: 0.5rem;
`;

const H2 = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    color: #0554f2;
    text-align: center;
`;
