import React, { Component, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../context/user/userContext';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const userContext = useContext(UserContext);

    const { isAuthenticated } = userContext;
    return (
        <Route
            { ...rest }
            render={props =>
                !isAuthenticated ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
        }
        />
    )
}
