import { useReducer } from 'react'
import axios from 'axios';

import UserContext from './userContext';
import UserReducer from './userReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADD_TO_CART,
    CART_ERROR,
    CHECKOUT,
    UPDATE_ORDER,
    REMOVE_PRODUCT,
    CLEAR_ERRORS,
    GET_ORDERS
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

export const UserState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
        cart: null,
        orders: null,
        is_update_cart: null,
        error: null
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    // Load User
    const loadUser = async () => {
        setAuthToken(localStorage.token);

        const res = await axios.get('/api/users/auth');

        try {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    };

    // Register User
    const register = async (userData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users/register', userData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    // Login User
    const login = async (userData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users/login', userData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    };

    // Logout User
    const logout = () => {dispatch({type: LOGOUT})};

    // Add To Cart
    const addToCart = async (productData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users/add-to-cart', productData, config)

            dispatch({
                type: ADD_TO_CART,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                 type: CART_ERROR, 
                 payload: err.response.data.msg 
            });
        }
    };
    

    const checkout = async () => {
        const res = await axios.get('/api/users/checkout');
        try {
            dispatch({
                type: CHECKOUT, 
                payload: res.data
           });

           loadUser();
        } catch (err) {
            dispatch({
                 type: CART_ERROR
            });
        }
    }

    const updateOrder = async (orderData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log('funcc');
        orderData.quantity = Number(orderData.quantity);

        try {
            const res = await axios.post('/api/users/update-cart', orderData, config)

            dispatch({
                type: UPDATE_ORDER,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                 type: CART_ERROR
            });
        }
    }

    // Remove Product from Cart.
    const removeProduct = async (id) => {
        try {
            const res = await axios.delete(`/api/users/remove-product/${id}`);
            
            dispatch({
                type: REMOVE_PRODUCT,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                 type: CART_ERROR
            });
        }
    };

    // Get orders
    const getOrders = async () => {
        try {
            const res = await axios.get(`/api/users/get-orders`);
            
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                 type: CART_ERROR
            });
        }
    };

    // Clear Errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    return (
        <UserContext.Provider value={{
            token: state.token,
            user: state.user,
            cart: state.cart,
            orders: state.orders,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            is_update_cart: state.is_update_cart,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            addToCart,
            checkout,
            updateOrder,
            removeProduct,
            getOrders,
            clearErrors
        }}>
            { props.children }
        </UserContext.Provider>
    )
};