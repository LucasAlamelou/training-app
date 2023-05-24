import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const ErrorElement = ({ error }) => {
    return (
        <ErrorElementDiv>
            <H2>
                {' '}
                <FontAwesomeIcon icon={faExclamationTriangle} color={'red'} /> Opps.. Erreur..
                veuillez retourner sur la page des entrainements. {error}
                ou contacter l'administrateur du site.
                <Link to={'/login'}>Page de connexion</Link>
            </H2>
        </ErrorElementDiv>
    );
};

const ErrorElementDiv = styled.div`
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const H2 = styled.h2`
    color: red;
    width: 80%;
    text-align: center;
    font-size: 1.5rem;
    margin-top: 1.8rem;
    font-weight: 700;
`;
