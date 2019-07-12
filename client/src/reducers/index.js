import { combineReducers } from "redux";
import { ProductsReducer, ProductReducer, departmentReducer, catagoryReducer, productByCategoryReducer, ProductAttributeReducer, addCartReducer, getCartReducer, getCartIDReducer } from './productsReducer'




export default combineReducers({
    products: ProductsReducer,
    product: ProductReducer,
    departments: departmentReducer,
    catagories: catagoryReducer,
    productByCategory: productByCategoryReducer,
    productAttribute: ProductAttributeReducer,
    addToCart: addCartReducer,
    cart: getCartReducer,
    cart_id: getCartIDReducer
})