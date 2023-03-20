import React from 'react';
import styled from 'styled-components';

export const Field = ({ id, name, value, setValue, label, type, required, placeHolder }) => {
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
                placeholder={placeHolder}
            />
        </DivChamp>
    );
};

export const FieldSelect = ({ id, name, value, setValue, label, type, required, listOptions }) => {
    return (
        <DivChamp>
            <LabelInput htmlFor={id}>{label}</LabelInput>
            <Select
                type={type}
                value={value}
                name={name}
                id={id}
                onChange={(event) => {
                    setValue(event.currentTarget.value);
                }}
                required={required}
            >
                {listOptions &&
                    listOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nameSport}
                        </option>
                    ))}
            </Select>
        </DivChamp>
    );
};

export const TextAera = ({
    id,
    name,
    value,
    setValue,
    label,
    type,
    required,
    placeHolder,
    rows,
    cols,
}) => {
    return (
        <DivChamp>
            <LabelInput htmlFor={id}>{label}</LabelInput>
            <TextArea
                type={type}
                value={value}
                name={name}
                id={id}
                onChange={(event) => setValue(event.currentTarget.value)}
                required={required}
                placeholder={placeHolder}
                rows={rows}
                cols={cols}
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
    height: 2.5rem;
    border: 1px solid #0554f2;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1b8ef2;
`;

export const Select = styled.select`
    height: 2.5rem;
    border: 1px solid #0554f2;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1b8ef2;
`;

export const TextArea = styled.textarea`
    width: 60%;
    height: 10rem;
    border: 1px solid #0554f2;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1b8ef2;
`;
