import React from 'react';
import styled from 'styled-components';

export const Field = ({ id, name, value, setValue, label, type, required }) => {
    return (
        <DivChamp>
            <LabelInput htmlFor={id}>{label}</LabelInput>
            <Input
                type={type}
                value={value}
                name={name}
                id={id}
                onChange={(event) => setValue(event.currentTarget.value)}
                required={required}
            />
        </DivChamp>
    );
};

export const DivChamp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

export const LabelInput = styled.label`
    font-size: 1.2rem;
    font-weight: 600;
    color: #0554f2;
`;

export const Input = styled.input`
    width: 60%;
    height: 2.5rem;
    border: 1px solid #0554f2;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #0554f2;
`;
