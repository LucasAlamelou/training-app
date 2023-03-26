import React from 'react';
import styled from 'styled-components';
import { convertDateToFrenchDate } from '../util/DateUtils.js';
import { ButtonsPanelActions } from './ButtonsPanelActions.js';

export const FieldTraining = ({ training, deleteTraining }) => {
    return (
        <>
            <Training>
                <Element>{training.name}</Element>
                <Element>{training.km === null ? 0 : training.km}</Element>
                <Element>{training.along}</Element>
                <Element>{convertDateToFrenchDate(training?.date)}</Element>
                <Element>{training.note ? training.note : ''}</Element>
                <Element>{training.city ? training.city : ''}</Element>
                <ButtonsPanelActions
                    idTarget={training.idTraining}
                    linkAction={'/training'}
                    functionClick={deleteTraining}
                    displayShowMore={false}
                />
            </Training>
        </>
    );
};

const Training = styled.tr`
    width: 90%;
    margin: 0 auto;
    margin-top: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #6bb3f2;
`;

const Element = styled.td`
    padding: 1rem;
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
`;
