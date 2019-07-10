import { FETCH_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATAGORIES, FETCH_PRODUCTS_BY_ID } from "../actions/types";

export const ProductReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
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



