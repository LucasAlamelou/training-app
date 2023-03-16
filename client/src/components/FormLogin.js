import React, { useState } from 'react';
import { Form, useActionData } from 'react-router-dom';
import styled from 'styled-components';
import { Field, DivChamp } from './FieldInput.js';

export const FormLogin = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
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
                <DivChamp>
                    <DivError>{errors?.error && <span>{errors.error.message}</span>}</DivError>
                    <Button type="submit">Connexion</Button>
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

export const DivLink = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    a {
        color: #0554f2;
        text-decoration: underline;
    }
`;
