import React, { useEffect, useContext, useState } from 'react'
import Spinner from '../layout/Spinner';

import { Login } from '../user/Login';
import ProductContext from '../../context/product/productContext';
import UserContext from '../../context/user/userContext';
import AlertContext from '../../context/alert/alertContext';

export const FeatureItem = (props) => {
    const productContext = useContext(ProductContext);
    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);

    const { getSingleProduct, product } = productContext;
    const { user, addToCart } = userContext;
    const { setAlert } = alertContext;

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src = "/js/isotope.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "/js/flex-slider.js";
        script2.async = true;
        
        const script3 = document.createElement("script");
        script3.src = "/js/custom.js";
        script3.async = true;

        const script4 = document.createElement("script");
        script4.src = "/js/owl.js";
        script4.async = true;

        getSingleProduct(props.match.params.id);

        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);
        document.body.appendChild(script4);

        // eslint-disable-next-line
    }, []);


    const onClick = (e) => {
        e.preventDefault();

        console.log('Cart Func');

        console.log(product);

        let productData = {
            product_id: product._id,
            product_quantity: quantity,
            user_id: user._id,
            user_cart: user.cart
        }

        if(quantity === 0) {
            setAlert('Please choose amount before adding to cart!', 'danger');
        } 
        addToCart(productData);
        if(e.target.name === 'cart') {
            setAlert('Product Added to Cart Successfully!', 'success');
            props.history.push('/products')
        } else {
            props.history.push('/checkout')
        }
    };

    const onChange = (e) => {
        setQuantity(e.target.value);
    }

    if(user === null) {
        return (
            <Login />
        )
    }

    if(product === null) {
        return (
            <Spinner />
        )
    } else {
        return (
            <div className="single-product">
                <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="section-heading">
                                        <div className="line-dec"></div>
                                        <h1>{product.name}</h1>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product-slider">
                                        <div id="slider" className="flexslider">
                                            <ul className="slides">
                                                {product.photos.map(photo => (
                                                    <li>
                                                        <img src={photo} alt="" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div id="carousel" className="flexslider">
                                            <ul className="slides">
                                                {product.photos.map(photo => (
                                                    <li>
                                                        <img src={photo} alt="" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="right-content">
                                    <h4>{product.name}</h4>
                                    <h6>Rs. {product.price}</h6>
                                    <p>{product.description} </p>
                                    <span>{product.stock} left on stock</span>
                                    <form action="">
                                        <label htmlFor="quantity">Quantity:</label>
                                        <input name="quantity" onChange={onChange} type="number" className="quantity-text" id="quantity"
                                            value={quantity} minLength='1' min='1' />
                                        <button type="submit" onClick={onClick} className="btn btn-success" name="cart" value="addtocart">Add To Cart</button>
                                        <button type="submit" onClick={onClick}className="button" name="order" value="ordernow">Order Now</button>
                                    </form>
                                <div className="down-content">
                                    <div className="categories">
                                        <h6>Category: 
                                            {product.categories.map(category => (
                                                <span>{category},</span>
                                            ))}
                                        </h6>
                                    </div>
                                    <div className="share">
                                        <h6>Share: <span><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a><a href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a><a href="https://www.twitter.com/"><i className="fa fa-twitter"></i></a></span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
