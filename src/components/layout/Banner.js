import React from 'react'

export const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="caption">
                            <h2>PIXIE ONLINE STORE</h2>
                            <div className="line-dec"></div>
                                <p>
                                    Pixie is an Ecommerce store for clothing and wearables. With dressed of almost <strong>Every category </strong> 
                                    this platform serves great for our customers. Easy one click to order your favourite brand and keep track of your orders. 
                                    <br/><br/>With a pre-paid solution so that you dont have to worry about the cash ready when the product arrive. 
                                </p>
                                <div className="main-button">
                                    <a href="/products">Order Now!</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
