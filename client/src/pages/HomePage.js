import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { PreviewMDE } from '../components/PreviewMDE.js';
import styled from 'styled-components';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';

export const HomePage = () => {
    const data = useLoaderData();
    if (data?.error) {
        return (
            <div className="container">
                <H2>Page d'acceuil</H2>
                <div className="alert alert-danger" role="alert">
                    {data.error.message}
                </div>
            </div>
        );
        // Traiter rien a affiché
    }
    const listFonctionnalites = data;

    return (
        <div className="container">
            <H2>Page d'acceuil</H2>
            {listFonctionnalites.length === 0 && (
                <DivPreviewFonctionnalite>
                    Aucune fonctionnalité à afficher
                </DivPreviewFonctionnalite>
            )}
            {listFonctionnalites.map((fonctionnalite) => (
                <>
                    <DivFonctionnalites key={fonctionnalite.id}>
                        <DivPreviewFonctionnalite>
                            <PreviewMDE
                                content={fonctionnalite.description}
                                options={{ forceBlock: true }}
                            />
                        </DivPreviewFonctionnalite>
                    </DivFonctionnalites>
                </>
            ))}
        </div>
    );
};

const DivFonctionnalites = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
`;

const DivPreviewFonctionnalite = styled.div`
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #0554f2;
    border-radius: 0.7rem;
    width: 80%;
    @media ${DEVICE_WIDTH.tablet} {
        margin: 0 auto 2rem;
    }
`;

const H2 = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    margin-top: 1.8rem;
    font-weight: 700;
    color: #000;

    @media ${DEVICE_WIDTH.tablet} {
        font-size: 2rem;
        margin-top: 2rem;
    }
`;
