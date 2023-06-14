import React, { useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link, Navigate, useActionData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormLogin } from './FormLogin.js';
import { FormRegister } from './FormRegister.js';
import { authActions } from '../store/user-slice.js';
import { memberActions } from '../store/member-slice.js';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';
import { encryptToken } from '../util/Crypto.js';

export const Form = ({ pageLogin }) => {
    const [isLoginPage] = useState(pageLogin);
    const dispatch = useDispatch();
    const dataAuthResult = useActionData();
    const user = useSelector((state) => state.user);

    if (
        (dataAuthResult?.token && dataAuthResult?.id) ||
        (dataAuthResult?.token && dataAuthResult?.userId)
    ) {
        const cryptToken = encryptToken(
            dataAuthResult.token,
            process.env.REACT_APP_TOKEN_STOCKAGE_KEY_FRONT
        );
        dispatch(
            authActions.addUserConnected({
                isConnected: true,
                user: dataAuthResult.id,
                member: dataAuthResult.idMember,
                roles: dataAuthResult.roles,
                email: dataAuthResult.email,
                tokenEncrypt: cryptToken,
            })
        );
        dispatch(memberActions.addMember({ member: dataAuthResult.member }));
        Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            showConfirmButton: false,
            timer: 1500,
        });
        if (dataAuthResult.emailVerify === 0) {
            // gèrer la popup de vérification d'email en décalage avec la popup de connexion réussie
            setTimeout(() => {
                Swal.fire({
                    icon: 'warning',
                    title: "Votre email n'est pas confirmer. Veuillez vérifier votre boîte mail.",
                    showConfirmButton: true,
                    //timer: 1500,
                });
            }, 1500);
        }
        if (user.tokenEncrypt && user.isConnected) {
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
    width: ${(props) => (props.isLoginPage === true ? '60%' : '60%')};
    height: 60%;
    padding: 1rem;
    background-color: #fff;
    border: 2px solid #0554f2;
    border-radius: 0.5rem;
    @media ${DEVICE_WIDTH.tablet} {
        width: ${(props) => (props.isLoginPage === true ? '40%' : '50%')};
    }
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
