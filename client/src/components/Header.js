import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { authActions } from '../store/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';

const ROLE = 'ROLE_ADMIN';

export function Header() {
    const isToken = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const logoutUserAndRedirect = () => {
        dispatch(authActions.removeUserConnected({}));
        return Navigate('/');
    };
    return (
        <>
            <DivTitleButton>
                <FontAwesomeIcon icon={faBars} onClick={handleNavCollapse} size={'2xl'} />
            </DivTitleButton>
            {isNavCollapsed ? (
                <>
                    <DivHeader>
                        <H2>Mes entrainements</H2>
                        <Ul>
                            <Item path={'/home'} name={'Acceuil'} />
                            {user.roles.includes(ROLE) ? (
                                <Item path={'/admin'} name={'Admin-Interface'} />
                            ) : null}
                            {!isToken ? <Item path={'/login'} name={'Connexion'} /> : null}
                            {!isToken ? <Item path={'/register'} name={'Inscription'} /> : null}
                            {!user.token && !user.isConnected ? null : (
                                <>
                                    <Item path={'/my-training'} name={'Mes entrainements'} />
                                    <Item
                                        path={'/my-training/new'}
                                        name={'Ajouter un entrainement'}
                                    />
                                </>
                            )}
                            <Item path={`/membre/${user.member}`} name={'Mon profil'} />
                            {isToken ? (
                                <Item name={'Déconnexion'} onClick={logoutUserAndRedirect} />
                            ) : null}
                        </Ul>
                    </DivHeader>
                </>
            ) : null}
        </>
    );
}

const Item = ({ path, name, onClick }) => {
    return (
        <Li>
            <Link to={path} onClick={onClick}>
                {name}
            </Link>
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
    width: 95%;
    height: 100%;
    background-color: #6bb3f2;
    border: 0.3px solid #0554f2;
    @media ${DEVICE_WIDTH.tablet} {
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        width: 20%;
        height: 100%;
    }
`;

const H2 = styled.h2`
    color: #FFFFF;
    font-size: 1.5rem;
    margin-top: 1.9rem;
    @media ${DEVICE_WIDTH.tablet} {
        font-size: 2rem;
    }
`;

const DivTitleButton = styled.div`
    position: absolute !important;
    z-index: 100;
    top: 10px;
    right: 10px;
    margin: 1.2rem;
    cursor: pointer;
    @media ${DEVICE_WIDTH.tablet} {
        display: none;
    }
`;
