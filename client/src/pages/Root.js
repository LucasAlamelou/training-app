import React from 'react';
import { Header } from '../components/Header.js';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { PrivateRoute } from '../components/PrivateRoutes.js';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';

export const Root = () => {
    return (
        <>
            <PrivateRoute>
                <Header />
                <Div>
                    <Outlet />
                </Div>
            </PrivateRoute>
        </>
    );
};

const Div = styled.div`
    width: 100%;
    margin-left: 0;
    @media ${DEVICE_WIDTH.tablet} {
        width: 80%;
        margin-left: 20%;
    }
`;
