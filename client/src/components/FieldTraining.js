import React from 'react';
import styled from 'styled-components';
import { convertDateToFrenchDate } from '../util/DateUtils.js';
import { ButtonsPanelActions } from './ButtonsPanelActions.js';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';

export const FieldTraining = ({ training, deleteTraining, content }) => {
    return (
        <>
            <Training>
                <Element content={content[0]}>{training.name}</Element>
                <Element content={content[1]}>{training.km === null ? 0 : training.km}</Element>
                <Element content={content[2]}>{training.along}</Element>
                <Element content={content[3]}>{convertDateToFrenchDate(training?.date)}</Element>
                <Element content={content[4]}>{training.note ? training.note : ''}</Element>
                <Element content={content[5]}>{training.city ? training.city : ''}</Element>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-top: 2px solid #0554f2;
    @media ${DEVICE_WIDTH.tablet} {
        display: table-row;
        background-color: #6bb3f2;
        width: 90%;
        margin: 0 auto;
        margin-top: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }
`;

const Element = styled.td`
    display: block;
    width: 100%;
    float: right;
    padding: 1rem;
    :before {
        float: left;
        text-align: left;
        margin-left: 0.5rem;
        content: '${(props) => props.content}';
        font-weight: bold;
        min-width: 10rem;
    }

    @media ${DEVICE_WIDTH.tablet} {
        width: 10%;
        float: none;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        display: table-cell;
        padding: 1rem;
        :before {
            content: none;
        }
    }
`;
