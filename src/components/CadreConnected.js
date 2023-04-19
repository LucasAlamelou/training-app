import React from 'react';
import styled from 'styled-components';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const CadreConnected = ({ firstName, lastName, isConnected }) => {
    return (
        <>
            <Cadre>
                <FontAwesomeIcon icon={faUser} color={isConnected ? 'green' : 'red'} />
                <p>
                    {isConnected
                        ? `${firstName ? firstName : ''} ${lastName ? lastName : ''}`
                        : 'Déconnecté'}
                </p>
            </Cadre>
        </>
    );
};

const Cadre = styled.div`
    display: none;
    @media ${DEVICE_WIDTH.tablet} {
        position: absolute;
        top: 1.2rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 20%;
        height: 20px;
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
    @media ${DEVICE_WIDTH.laptop} {
        width: 11%;
        right: 2px;
    }
`;
