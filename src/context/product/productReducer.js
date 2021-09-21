import {
    GET_PRODUCT,
    SINGLE_PRODUCT,
    PRODUCT_ERROR,
    CHANGE_PAGE,
    ADD_TO_CART
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                products: action.payload
            }
        case SINGLE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    }
}