import React, { useContext, useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';

import UserContext from '../../context/user/userContext'

import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const Payment = (props) => {
    const userContext = useContext(UserContext);

    const { cart } = userContext;
    
    const [amount, setAmount] = useState();

    useEffect(() => {
        let total=0;
        cart.forEach((cartItem) => {
            total += cartItem.quantity * cartItem.price;
        });
        setAmount(total);
        
        //eslint-disable-next-line
    }, []);

    const handleToken = async (token) => {
        const res = await axios.post('/api/users/payment', {
            token,
            amount,
        })

        const { status, response } = res.data;

        if(status === 'success') {
            toast('Success! Check your email for payment details',
                { type: status }
            )

            await axios.post('/api/users/confirm-order', {
                cart,
                billing_details: response
            });

            props.history.push('/my-orders');
        } else {
            toast('Ooops! Something went wrong',
                { type: status }
            )
        }
    }

    return (
        <div>
            <div className="container-fluid bg-light py-5">
                <br/>
                <div className="row no-gutters">
                    <div className="m-auto">
                        <h1 className="h2">Confirm Your Order</h1>
                    </div>
                    {/* <div className="mr-0 col-4">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <p className="text-muted mb-0"><strong>subtotal: </strong></p>
                                <p><strong>Rs.<span id="total-amount">0.00</span></strong></p>
                            </div>
                            <div className="col-md-4">
                                <Link to="/confirm-order">
                                    <div className="btn btn-success mb-2" id="checkout-btn">
                                        <i className="fas fa-wallet"></i>
                                        <span> Checkout</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            {cart.map((cartItem, index) => (
                <div className="container my-4">
                    <div className="card shadow my-3 draft listing-card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-sm-2 text-center">
                                    <img style={{height: '80px'}} src={cartItem.photo} alt=""></img>
                                </div>
                                <div className="col-sm-2 text-center">
                                    <p className="text-muted">Product: <strong>{cartItem.name}</strong></p>
                                </div>
                                <div className="col-sm-2 text-center">
                                    <p className="text-muted" style={{fontSize: 'small !important' }}>Price: <strong> Rs. {cartItem.price}/item</strong></p>
                                 </div>
                                <div className="col-sm-1 text-center">
                                    <p className="text-muted" style={{fontSize: 'small !important' }}>Quantity: <strong><span>{cartItem.quantity}x</span></strong></p>
                                </div>
                                <div className="col-sm-2 text-center">
                                    <p className="text-muted" style={{fontSize: 'small !important' }}>Total:<strong>Rs. {cartItem.quantity * cartItem.price}</strong></p>
                                </div>
                                <div className="col-md-2 text-center">
                                    <p><strong>Rs. <span className="cart-item-total-price" id={`cart-item-total-price-${cartItem.id}`}>{(cartItem.quantity * cartItem.price).toFixed(2)}</span></strong></p>
                                </div>
                                <div className="col-md-1 text-center">
                                    <a href={`/shop/delete-cartItem/${cartItem.id}`}><i className="fas fa-trash-alt text-danger"></i></a>
                                </div>
                            </div><br/>
                        </div>
                    </div>
                </div>
            ))}
            <div className="container my-4">
                <div className="card shadow my-3 draft listing-card">
                    <p><strong>Total Amount: <span className="cart-item-total-price">{amount}</span></strong></p>
                    <StripeCheckout 
                        stripeKey="pk_test_51Hd2PNCIfT8pgdvHsYAk9cMVhN7yQh5xTzqMO4Qtd8kZFkRCbT134Yf3poBMSi5WcaKSe3mqAxmCDZdS89Z5fHaO00yQwHdUzd"
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        amount={amount * 100}
                        name={'PIXIE!'}
                        currency={'PKR'}
                        
                    />
                </div>
            </div>
        </div>
    )
}
