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
    GET_ORDERS,
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: action.payload.token
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case CART_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                cart: null,
                error: action.payload
            }
        case ADD_TO_CART:
            return {
                ...state,
                user: action.payload
            }
        case CHECKOUT:
            return {
                ...state,
                is_update_cart: true,
                cart: action.payload
            }
        case UPDATE_ORDER:
        case REMOVE_PRODUCT:
            return {
                ...state,
                cart: state.cart.map(cartItem => cartItem.id === action.payload.id ? action.payload : cartItem),
                is_update_cart: true,
                loading: false
            }
        case GET_ORDERS: {
            return {
                ...state,
                orders: action.payload
            }
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                is_update_cart: false
            }
        default:
            return state
    }
};