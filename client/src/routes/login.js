import React from 'react';

export const Login = () => {
    return (
        <>
            <p>Hello From login</p>
            <form method="post" action="/login">
                <input type="text" name="email" />
                <input type="password" name="password" />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
};
