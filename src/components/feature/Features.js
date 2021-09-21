import React, { useEffect, useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'

import ProductContext from '../../context/product/productContext';

export const Features = () => {
    const productContext = useContext(ProductContext);

    const { getProducts, products } = productContext;

    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src = "/js/custom.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "/js/owl.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);

        getProducts();

        // eslint-disable-next-line
    }, [])

    if (products.length > 0 && products !== null) {
        return (
            <div className="featured-items">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Featured Items</h1>
                                <div className="pull-right">
                                    <a href="/products">
                                            <span><strong>View All</strong></span>
                                    </a>
                                </div>
                            </div>
                        </div>
    
                        <div className="featured container no-gutter">
                            <div className="row">   
                                { products !== null ? products.map((product, index) => (
                                    product.length > 4 ? (
                                        products.length-1 > index && (
                                            <Link to={{pathname: `/single-item/${product._id}`}}>
                                                <div className="featured-item" >
                                                    <img src="/images/item-01.jpg" alt="Item 1" style={{width: "200px", height: "230px"}} />
                                                    <h4>{product.name}</h4>
                                                    <h6>Rs. {product.price}</h6>
                                                </div>
                                            </Link>
                                        )
                                    ) : (
                                        <Link to={{pathname: `/single-item/${product._id}`}}>
                                            <div className="featured-item">
                                            <img src={product.photos[0]} alt="Item 1" style={{width: "200px", height: "230px"}} />
                                            <h4>{product.name}</h4>
                                            <h6>Rs. {product.price}</h6>
                                            </div>
                                        </Link>
                                    )
                                )) : 
                                    <Fragment>
                                        No Products Available.
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="featured-items">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Featured Items</h1>
                                <div className="pull-right">
                                    <a href="/products">
                                            <span><strong>View All</strong></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="featured container no-gutter">
                            <Fragment>
                                No Products Available.
                            </Fragment>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
