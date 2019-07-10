import { combineReducers } from "redux";
import { ProductReducer, departmentReducer, catagoryReducer, productByCategoryReducer } from './productsReducer'




export default combineReducers({
    products: ProductReducer,
    departments: departmentReducer,
    catagories: catagoryReducer,
    productByCategory: productByCategoryReducer
})