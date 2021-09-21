import React, { useEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../../context/user/userContext'

export const Navbar = () => {
    const userContext = useContext(UserContext);
    const { loadUser, isAuthenticated, user, logout, is_update_cart } = userContext;

    useEffect(() => {
        loadUser();

        //eslint-disable-next-line
    }, []);

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/my-orders">
                    <span>Hello { user && user.username }</span>
                </Link>
            </li>
            <li className="nav-item">
                {user !== null && user.cart !== null && user.cart.length > 0 ? (
                <Link className="nav-link" to="/checkout">
                    <i className="fas fa-cart-arrow-down"><span style={{color: 'green'}}>CART</span></i>
                </Link>
                ) : (
                <Link className="nav-link" to="/checkout">
                    <i className="fas fa-shopping-cart">CART</i>
                </Link>
                )}
            </li>
            <li className="nav-item">
                <Link className="nav-link" onClick={onLogout} to="/">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </Fragment>
    )

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <Link className="navbar-brand" to="/" ><img name="/" src="images/header-logo.png" alt="" /></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link  name="/" className="nav-link" to="/">Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link name="/products" className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About Us</a>
                        </li>
                        { isAuthenticated ? authLinks : guestLinks }
                    </ul>
                </div>
            </div>
        </nav> 
    )
}

