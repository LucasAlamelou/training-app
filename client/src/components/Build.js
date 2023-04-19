import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

export const Build = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bolder',
                fontSize: '25px',
                marginTop: '5rem',
            }}
        >
            <StyledBuild>
                Page en construction...{' '}
                <FontAwesomeIcon icon={faHammer} color={'gold'} size={'xl'} />
            </StyledBuild>
        </div>
    );
};

const StyledBuild = styled.p`
    animation-name: wave;
    animation: wave 2s linear infinite;
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes wave {
        0% {
            transform: rotate(10deg);
        }
        25% {
            transform: rotate(-5deg);
        }
        50% {
            transform: rotate(10deg);
        }
        75% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(10deg);
        }
    }
`;
