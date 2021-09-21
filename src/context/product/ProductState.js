import { useReducer } from 'react'
import axios from 'axios';

import ProductContext from './productContext';
import ProductReducer from './productReducer';
import {
    GET_PRODUCT,
    SINGLE_PRODUCT,
    PRODUCT_ERROR,
    CHANGE_PAGE,
} from '../types';

export const ProductState = (props) => {
    const initialState = {
        products: [],
        product: null,
        error: null,
        currentPage: 1,
        productsPerPage: 10
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    // Get Products
    const getProducts = async () => {
        try {
            const res = await axios.get('https://pixie-mern.herokuapp.com/api/products');

            dispatch({
                 type: GET_PRODUCT, 
                 payload: res.data 
            });
        } catch (err) {
            dispatch({
                 type: PRODUCT_ERROR, 
                 payload: err.response.data.msg 
            });
        }
    };

    // Get Single Product
    const getSingleProduct = async (id) => {
        try {
            const res = await axios.get(`https://pixie-mern.herokuapp.com/api/products/${id}`);

            dispatch({
                 type: SINGLE_PRODUCT, 
                 payload: res.data 
            });
        } catch (err) {
            dispatch({
                 type: PRODUCT_ERROR, 
                 payload: err.response.data.msg 
            });
        }

    };

    // Change Page
    const changePage = (number) => {
        dispatch({
            type: CHANGE_PAGE,
            paylaod: number
        });
    }

    return (
        <ProductContext.Provider value={{
            products: state.products,
            product: state.product,
            currentPage: state.currentPage,
            productsPerPage: state.productsPerPage,
            error: state.error,
            getProducts,
            getSingleProduct,
            changePage,
        }}>
            { props.children }
        </ProductContext.Provider>
    )
};