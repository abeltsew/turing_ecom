import { combineReducers } from "redux";
import { reducer as reduxForm } from 'redux-form'

import authReducer from './authReducer';

import { ProductsReducer } from './productsReducer'
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer"

export default combineReducers({
    auth: authReducer,
    products: ProductsReducer,
    cart: cartReducer,
    form: reduxForm,
    order: orderReducer

})


//import { ProductsReducer, ProductReducer, departmentReducer, catagoryReducer, productByCategoryReducer, ProductAttributeReducer, addCartReducer, getCartReducer, getCartIDReducer, DeleteCartItemReducer } from './productsReducer'



// export default combineReducers({
//     auth: authReducer,
//     products: ProductsReducer,
//     product: ProductReducer,
//     departments: departmentReducer,
//     catagories: catagoryReducer,
//     productByCategory: productByCategoryReducer,
//     productAttribute: ProductAttributeReducer,
//     addToCart: addCartReducer,
//     cart: getCartReducer,
//     cart_id: getCartIDReducer,
//     deleteCartItem: DeleteCartItemReducer
// })


