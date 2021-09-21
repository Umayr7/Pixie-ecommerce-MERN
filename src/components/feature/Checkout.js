import React, { useContext, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../../context/user/userContext'
import Spinner from '../layout/Spinner';
import { EmptyCart } from './EmptyCart';
import { OrderItem } from './OrderItem';

export const Checkout = () => {
    const userContext = useContext(UserContext);

    const { user, cart, checkout } = userContext;

    useEffect(() => {
        checkout();

        // eslint-disable-next-line
    }, [cart]);

    if(user === null || cart === null) {
        return (
            <Spinner />
        )
    } else {
        return (
            <div>
                <div className="container-fluid bg-light py-5">
                    <br/>
                    <div className="row no-gutters">
                        <div className="m-auto">
                            <h1 className="h2">Your Cart</h1>
                        </div>
                        <div className="mr-0 col-4">
                            <div className="row no-gutters">
                                {cart.length > 0 ? (
                                    <Fragment>
                                        <div className="col-md-4">
                                            <p className="text-muted mb-0"><strong>subtotal: </strong></p>
                                            <p><strong>Rs.<span id="total-amount">0.0</span></strong></p>
                                        </div>
                                        <div className="col-md-4">
                                            <Link to="/confirm-order">
                                                <div className="btn btn-success mb-2" id="checkout-btn">
                                                    <i className="fas fa-wallet"></i>
                                                    <span> Checkout</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <div className="col-md-4">
                                            <button className="btn btn-success mb-2" disabled>
                                                 <i className="fas fa-wallet"></i>
                                                 <span> Checkout</span>
                                            </button>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                { user.cart.length < 0 && (
                    <div className="container pt-5 text-center" style={{minHeight: "40vh"}}>
                        <i className="fas fa-shopping-cart fa-10x text-success"></i><br/>
                        <h4 className="py-3">Your cart is empty!</h4>
                    </div>
                )}
                {cart.length > 0 ? (
                    cart.map((cartItem, index) => (
                        <OrderItem cartItem={cartItem} index={index} />
                    ))
                ) : (
                    <EmptyCart status={'Your cart is empty!'} />
                )}
            </div>
        )
    }

}
