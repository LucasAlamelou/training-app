import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormLogin } from './FormLogin.js';
import { FormRegister } from './FormRegister.js';

export const Form = ({ pageLogin }) => {
    const [isLoginPage] = useState(pageLogin);
    return (
        <>
            <DivForm isLoginPage={isLoginPage}>
                <H2>{isLoginPage ? 'Connexion' : 'Créer un compte'}</H2>
                {isLoginPage ? <FormLogin /> : <FormRegister />}
                {isLoginPage ? (
                    <DivLink>
                        <Link to="/register">Pas encore de compte ?</Link>
                    </DivLink>
                ) : (
                    <DivLink>
                        <Link to="/login">Se connecter</Link>
                    </DivLink>
                )}
            </DivForm>
        </>
    );
};

const H2 = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    color: #0554f2;
    text-align: center;
`;

const DivForm = styled.div`
    margin: 0 auto;
    margin-top: 5rem;
    width: ${(props) => (props.isLoginPage === true ? '40%' : '60%')};
    height: 60%;
    padding: 1rem;
    background-color: #fff;
    border: 2px solid #0554f2;
    border-radius: 0.5rem;
`;

const DivLink = styled.div`
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
