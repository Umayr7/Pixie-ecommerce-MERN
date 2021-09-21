import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const EmptyCart = (props) => {
    const { status } = props;

    return (
        <Fragment>
            <div className="container my-4">
                <div className="card shadow my-3 draft listing-card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="container pt-5 text-center" style={{minLength: '40vh'}}>
                                <i className="fas fa-shopping-cart fa-5x text-info" /><br/>
                                <h4 className="py-3">{status}</h4>
                            </div>
                        </div><br/>
                        <div className="container text-center" style={{minLength: '40vh'}}>
                                <p><strong>Go get your first Product Now!</strong></p>
                                <div>
                                    <Link to="/products">
                                        <div className="btn btn-success mb-2" id="checkout-btn">
                                            <i class="fas fa-tshirt"></i>
                                            <span>Browse Products</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
