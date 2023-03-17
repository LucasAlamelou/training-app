import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Header() {
    return (
        <>
            <DivHeader>
                <H2>Mes entrainements</H2>
                <Ul>
                    <Item path={'/home'} name={'Acceuil'} />
                    <Item path={'/login'} name={'Connexion'} />
                    <Item path={'/register'} name={'Inscription'} />
                    <Item path={'/create-training'} name={'Ajouter un entrainement'} />
                </Ul>
            </DivHeader>
        </>
    );
}

const Item = ({ path, name }) => {
    return (
        <Li>
            <Link to={path}>{name}</Link>
        </Li>
    );
};

const Li = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffff;
    cursor: pointer;
`;

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 30%;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 5rem;
`;

const DivHeader = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 20%;
    height: 100%;
    background-color: #6bb3f2;
    border: 0.3px solid #0554f2;
`;

const H2 = styled.h2`
    color: #FFFFF;
    font-size: 1.5rem;
`;
