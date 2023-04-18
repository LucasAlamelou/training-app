import React from 'react';
import { Header } from '../components/Header.js';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { PrivateRoute } from '../components/PrivateRoutes.js';
import { DEVICE_WIDTH } from '../util/SizeDevice.js';
import { CadreConnected } from '../components/CadreConnected.js';
import { useSelector } from 'react-redux';

export const Root = () => {
    const { member } = useSelector((state) => state);
    const { user } = useSelector((state) => state);
    console.log('member', member);
    return (
        <>
            <PrivateRoute>
                <Header />
                <CadreConnected
                    lastName={member.memberState?.lastName}
                    firstName={member.memberState?.firstName}
                    isConnected={user.isConnected}
                />
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
    }
    @media ${DEVICE_WIDTH.laptop} {
        width: 80%;
        margin-left: 20%;
    }
`;
