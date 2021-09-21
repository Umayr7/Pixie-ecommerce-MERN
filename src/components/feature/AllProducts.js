import React, { useEffect, useContext, Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import ProductContext from '../../context/product/productContext';
import {Pagination} from './Pagination';

export const AllProducts = () => {
    const productContext = useContext(ProductContext);

    const { getProducts, products, currentPage, productsPerPage } = productContext;

    const [currPage, setCurrPage] = useState(currentPage);

    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src = "/js/isotope.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "/js/custom.js";
        script2.async = true;

        const script3 = document.createElement("script");
        script3.src = "/js/owl.js";
        script3.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);

        getProducts();

        // eslint-disable-next-line
    }, []);

    // Get Current Products
    const indexOfLastPage = currPage * productsPerPage;
    const indexOfFirstPage = indexOfLastPage - productsPerPage;
    const currentProducts = products.slice(indexOfFirstPage, indexOfLastPage);
    
    // Change Page
    const paginate = (pageNo) => setCurrPage(pageNo);

    if(products.length > 0 && products !== null) {
        return (
            <Fragment>
                <div className="featured-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="section-heading">
                                    <div className="line-dec"></div>
                                    <h1>Featured Items</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="featured container no-gutter">
                    <div className="row">
                        { products !== null ? currentProducts.map((product, index) => (
                            <div id={index} className="item new col-md-4">
                                <Link to={{pathname: `/single-item/${product._id}`}} >
                                    <div className="featured-item">
                                        <img src={product.photos[0]} alt="" />
                                        <h4>{product.name}</h4>
                                        <h6>Rs. {product.price}</h6>
                                    </div>
                                </Link>
                            </div>
                        )) : 
                            <Fragment>
                                No Products Available.
                            </Fragment>
                        }
                    </div>
                </div>
    
                <div className="page-navigation">
                    <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
                </div>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <div className="featured-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="section-heading">
                                    <div className="line-dec"></div>
                                    <h1>Featured Items</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="featured container no-gutter">
                    <Fragment>
                        No Products Available...
                    </Fragment>
                </div>
            </Fragment>
        )
    }

}
