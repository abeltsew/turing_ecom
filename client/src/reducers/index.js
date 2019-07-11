import { combineReducers } from "redux";
import { ProductsReducer, ProductReducer, departmentReducer, catagoryReducer, productByCategoryReducer, ProductAttributeReducer, cartReducer } from './productsReducer'




export default combineReducers({
    products: ProductsReducer,
    product: ProductReducer,
    departments: departmentReducer,
    catagories: catagoryReducer,
    productByCategory: productByCategoryReducer,
    productAttribute: ProductAttributeReducer,
    cart: cartReducer
})