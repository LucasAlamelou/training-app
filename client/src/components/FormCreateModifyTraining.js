import React from 'react';
import styled from 'styled-components';
import { FormTraining } from './FormTraining.js';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';

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
    background-color: ;
    border: 2px solid #0554f2;
    border-radius: 0.5rem;
`;

const H2 = styled.h2`
    font-size: 1.5rem;
    margin-top: 1.9rem;
    font-weight: 600;
    color: #0554f2;
    text-align: center;
    @media ${DEVICE_WIDTH.tablet} {
        font-size: 2rem;
    }
`;
