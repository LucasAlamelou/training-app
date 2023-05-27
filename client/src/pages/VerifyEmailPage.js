import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const VerifyEmailPage = () => {
    const data = useLoaderData();
    const token = window.localStorage.getItem('Application_Training_Token');
    if (data?.error) {
        return (
            <>
                <DIV className="container">
                    <H2>Page de vérification de l'email</H2>
                    <DivP>
                        <P>Erreur de vérification de l'email</P>
                        <P>{data?.error.message}</P>
                        <P>Veuillez contacter le service client</P>
                    </DivP>
                </DIV>
            </>
        );
    }

    return (
        <>
            <DIV className="container">
                <H2>Page de vérification de l'email</H2>
                <DivP>
                    <P>Email vérifier</P>
                    <P>Vous pouvez vous connecter</P>
                    {token ? (
                        <P>
                            <Link to="/home">Page d'acceuil</Link>
                        </P>
                    ) : (
                        <Link to="/login">Se connecter</Link>
                    )}
                </DivP>
            </DIV>
        </>
    );
};

const DIV = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const H2 = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #000;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
`;

const DivP = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    > a {
        font-size: 1rem;
        text-decoration: underline;
        font-weight: 600;
        color: black;
    }
`;

const P = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    color: #0554f2;
    margin-top: 0.5rem;
`;
