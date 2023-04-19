import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ButtonMember = ({ label, favicon, functionClick, ...props }) => {
    return (
        <>
            <Button onClick={(e) => functionClick(e)} name={label} {...props}>
                <FontAwesomeIcon icon={favicon} />
                {label.toUpperCase()}
            </Button>
        </>
    );
};

const Button = styled.button`
    color: ${(props) => (props.isActive === true ? '#0554F2' : '#00000')};
    border: none;
    padding: 0.5rem 1rem;
    border-bottom: ${(props) => (props.isActive === true ? '0.2rem solid #0554f2' : null)};
    background-color: white;
    width: 250px;
    height: 60px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        border: 0.2rem solid #0554f2;
        border-radius: 0.5rem;
    }
    > svg {
        margin-right: 0.5rem;
        color: ${(props) => (props.isActive === true ? '#0554F2' : 'red')};
    }
`;
