import React from 'react';
import { Header } from '../components/Header.js';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const Root = () => {
    return (
        <>
            <Header />
            <Div>
                <Outlet />
            </Div>
        </>
    );
};

const Div = styled.div`
    width: 80%;
    margin-left: 20%;
`;
