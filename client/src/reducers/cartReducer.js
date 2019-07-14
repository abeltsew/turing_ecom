import { ADD_TO_CART, GET_CART, GET_CART_ID } from "../actions/types";

const initialState = {
    cart: [],
    cart_id: {},
    addToCart: {},
    deleteCartItem: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                addToCart: action.payload
            }
        case GET_CART_ID:
            return {
                ...state,
                cart_id: action.payload
            }
        case GET_CART:
            return {
                ...state,
                cart: action.payload
            }
        case 'DELETE_CART_ID':
            return
        default:
            return state
    }
}