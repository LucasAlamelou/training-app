import React from 'react';
import { HomePage } from '../pages/HomePage.js';
import { getLoader } from '../util/Loader.js';

export async function loader() {
    // get fonctionnalité from server
    const url = 'getFonctionnalitesActive';
    const response = await getLoader(url, 'GET');
    if (response?.error) {
        return response;
    }
    return response?.info;
}

export const Home = () => {
    return (
        <>
            <HomePage />
        </>
    );
};
