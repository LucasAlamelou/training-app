import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link, Navigate, useActionData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormLogin } from './FormLogin.js';
import { FormRegister } from './FormRegister.js';
import { authActions } from '../store/user-slice.js';

export const Form = ({ pageLogin }) => {
    const [isLoginPage] = useState(pageLogin);
    const dispatch = useDispatch();
    const dataAuthResult = useActionData();
    const user = useSelector((state) => state.user);

    if (
        (dataAuthResult?.token && dataAuthResult?.id) ||
        (dataAuthResult?.token && dataAuthResult?.userId)
    ) {
        dispatch(
            authActions.addUserConnected({
                isConnected: true,
                user: dataAuthResult.id,
                member: dataAuthResult.idMember,
                token: dataAuthResult.token,
                roles: dataAuthResult.roles,
                email: dataAuthResult.email,
            })
        );
        Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            showConfirmButton: false,
            timer: 1500,
        });
        if (user.token && user.isConnected) {
            return <Navigate to="/my-training" replace={false} />;
        }
    }

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
