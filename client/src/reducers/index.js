import { combineReducers } from "redux";
import { FETCH_PRODUCTS } from "../actions/types";


const ProductReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    products: ProductReducer

})