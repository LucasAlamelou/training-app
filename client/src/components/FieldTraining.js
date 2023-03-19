import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';

export const FieldTraining = ({ training, deleteTraining }) => {
    return (
        <>
            <Training>
                <Element>{training.name}</Element>
                <Element>{training.km === null ? 0 : training.km}</Element>
                <Element>{training.along}</Element>
                <Element>{training.note}</Element>
                <Element>{training.city}</Element>
                <Button>
                    <Link to={`/training/${training._id}`}>
                        <FontAwesomeIcon icon={faPlus} color="black" />
                    </Link>
                    <Link to={`/training/${training._id}`}>
                        <FontAwesomeIcon icon={faPenSquare} color="blue" />
                    </Link>
                    <ButtonDelete type="button" onClick={() => deleteTraining(training)}>
                        <FontAwesomeIcon icon={faTrash} color="red" />
                    </ButtonDelete>
                </Button>
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

const Button = styled.td`
    padding: 0.5rem;
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
    align-items: end;
    > a {
        margin-right: 0.5rem;
    }
`;

const ButtonDelete = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
`;