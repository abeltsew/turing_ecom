import { FETCH_PRODUCTS, FETCH_PRODUCT, FETCH_DEPARTMENTS, FETCH_CATAGORIES, FETCH_PRODUCTS_BY_ID, FETCH_PRODUCT_ATTRIBUTE, ADD_TO_CART, GET_CART, GET_CART_ID } from "../actions/types";

export const ProductsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload
        default:
            return state
    }
}

export const ProductReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            return action.payload
        default:
            return state
    }
}

export const ProductAttributeReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCT_ATTRIBUTE:
            return action.payload
        default:
            return state
    }
}

export const departmentReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_DEPARTMENTS:
            return action.payload
        default:
            return state
    }
}

export const catagoryReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_CATAGORIES:
            return action.payload
        default:
            return state
    }
}

export const productByCategoryReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_BY_ID:
            return action.payload
        default:
            return state
    }
}


export const addCartReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return action.payload
        default:
            return state
    }
}

export const getCartReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CART:
            return action.payload
        default:
            return state
    }
}


export const getCartIDReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART_ID:
            return action.payload
        default:
            return state
    }
}
