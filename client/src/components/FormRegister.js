import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, useActionData } from 'react-router-dom';
import { Field, DivChamp } from './FieldsForm.js';

export const FormRegister = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const errors = useActionData();

    return (
        <>
            <Form method="post">
                <Field
                    label={'Email'}
                    name={'email'}
                    id={'email-id'}
                    value={login}
                    setValue={setLogin}
                    required={true}
                />

                <DivError>{errors?.email && <span>{errors.email}</span>}</DivError>

                <Field
                    type={'password'}
                    label={'Mot de passe'}
                    name={'password'}
                    id={'password-id'}
                    value={password}
                    setValue={setPassword}
                    required={true}
                />
                <DivError>{errors?.password && <span>{errors.password}</span>}</DivError>

                <Field
                    type={'text'}
                    label={'Nom de famille'}
                    name={'lastName'}
                    id={'lastName-id'}
                    value={lastName}
                    setValue={setLastName}
                    required={true}
                />
                <DivError>{errors?.lastName && <span>{errors.lastName}</span>}</DivError>

                <Field
                    type={'text'}
                    label={'Prénom'}
                    name={'firstName'}
                    id={'firstName-id'}
                    value={firstName}
                    setValue={setFirstName}
                    required={true}
                />
                <DivError>{errors?.firstName && <span>{errors.firstName}</span>}</DivError>

                <Field
                    type={'date'}
                    label={'Date de naissance'}
                    name={'dateOfBirth'}
                    id={'dateOfBirth-id'}
                    value={dateOfBirth}
                    setValue={setDateOfBirth}
                    required={true}
                />
                <DivError>{errors?.dateOfBirth && <span>{errors.dateOfBirth}</span>}</DivError>

                <Field
                    type={'text'}
                    label={'Adresse'}
                    name={'address'}
                    id={'address-id'}
                    value={address}
                    setValue={setAddress}
                />
                <DivError>{errors?.address && <span>{errors.address}</span>}</DivError>

                <Field
                    type={'number'}
                    label={'Code postal'}
                    name={'zipCode'}
                    id={'zipCode-id'}
                    value={zipCode}
                    setValue={setZipCode}
                />
                <DivError>{errors?.zipCode && <span>{errors.zipCode}</span>}</DivError>

                <Field
                    type={'text'}
                    label={'Ville'}
                    name={'city'}
                    id={'city-id'}
                    value={city}
                    setValue={setCity}
                />
                <DivError>{errors?.city && <span>{errors.city}</span>}</DivError>

                <Field
                    type={'text'}
                    label={'Pays'}
                    name={'country'}
                    id={'country-id'}
                    value={country}
                    setValue={setCountry}
                />
                <DivError>{errors?.country && <span>{errors.country}</span>}</DivError>

                <DivChamp>
                    <DivError>{errors?.error && <span>{errors.error.message}</span>}</DivError>
                    <Button type="submit">S'inscrire</Button>
                </DivChamp>
            </Form>
        </>
    );
};

export const Button = styled.button`
    width: 40%;
    height: 2.5rem;
    border: 1px solid #0554f2;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #0554f2;
    background-color: #fff;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

export const DivError = styled.div`
    color: red;
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0 auto;
    margin-top: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.6rem;
`;
