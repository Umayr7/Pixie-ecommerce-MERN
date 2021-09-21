import React, { useEffect, useContext } from 'react'

import UserContext from '../../context/user/userContext'
import Spinner from '../layout/Spinner';
import { EmptyCart } from './EmptyCart';

export const Orders = () => {
    const userContext = useContext(UserContext);

    const { getOrders, orders } = userContext;

    useEffect(() => {
        getOrders();

        // eslint-disable-next-line
    }, []);

    if(orders === null || orders.length === 0) {
        return (
            <>
                <div className="container-fluid bg-light py-5">
                    <br/>
                    <div className="row no-gutters">
                        <div className="m-auto">
                            <h1 className="h2">My Orders</h1>
                        </div>
                    </div>
                </div>
                <EmptyCart status={'You have not ordered anything yet :('} />
            </>
        )
    } else {
        return (
            <div>
                <div className="container-fluid bg-light py-5">
                    <br/>
                    <div className="row no-gutters">
                        <div className="m-auto">
                            <h1 className="h2">My Orders</h1>
                        </div>
                    </div>
                </div>
                {orders.map((orderItem, index) => (
                    <div className="container my-4">
                        <div className="card shadow my-3 draft listing-card">
                            <p>Order <span style={{color:'#1a9cb7'}}>#{orderItem._id}</span></p>
                            <p>Placed on  <span>{orderItem.date.slice(0,10)}</span></p>
                            <h5> <span class="badge badge-success">{orderItem.status}</span></h5>
                            <hr/>
                            <div className="card-body">
                                    {orderItem.item.map(cartItem => (
                                        <>
                                            <div className="row align-items-center">
                                                <div className="col-sm-2 text-center">
                                                    <img style={{height: '80px'}} src="/images/big-01.jpg" alt=""></img>
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                        <p className="text-muted">Product Name: <strong>{cartItem.name}</strong></p>
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                        <p className="text-muted">Qty: <strong>{cartItem.quantity}x</strong></p>
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                        <p className="text-muted">Price: Rs. <strong>{cartItem.price}/item</strong></p>
                                                </div>
                                                <div className="col-sm-2 text-center">
                                                        <p className="text-muted">Total: Rs. <strong>{cartItem.price*cartItem.quantity}</strong></p>
                                                </div>
                                            </div><hr/>
                                        </>
                                    ))}
                                <div className="row align-items-center">
                                    <div className="col-sm-2 text-center">
                                        <p className="text-muted">Net Amount: <strong>{orderItem.total_amount}</strong></p>
                                    </div>
                                    <div className="col-sm-3text-center">
                                        <p className="text-muted">Shipping Address: <strong>{orderItem.address}</strong></p>
                                    </div>
                                    <div className="col-sm-4 text-center">
                                        <p>Receipt Url: <strong><a href={orderItem.receipt_url} target="_blank">Click Here</a></strong></p>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

}
