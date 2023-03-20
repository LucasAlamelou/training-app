import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/index.js';

export const Home = () => {
    const stateUser = useSelector((state) => state);
    const token = useSelector((state) => state.user.token);
    const isConnected = useSelector((state) => state.user.isConnected);
    const dispatch = useDispatch();
    return (
        <>
            <p>Hello Home</p>
            <Link to="/login">Login</Link>
            <button
                onClick={(e) => {
                    dispatch(
                        authActions.addUserConnected({
                            isConnected: true,
                            user: 'test',
                            token: 'test',
                        })
                    );
                }}
                type="button"
            >
                Add User
            </button>
            <button
                onClick={(e) => {
                    dispatch(authActions.removeUserConnected({}));
                }}
                type="button"
            >
                Delete User
            </button>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
};
