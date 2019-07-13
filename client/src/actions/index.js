import axios from "axios";
import { FETCH_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATAGORIES, FETCH_PRODUCTS_BY_ID, FETCH_PRODUCT, FETCH_PRODUCT_ATTRIBUTE, ADD_TO_CART, GET_CART, GET_CART_ID, DELETE_CART_ID, FETCH_USER } from './types'

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('/api/products')
    dispatch({
        type: FETCH_PRODUCTS,
        payload: res.data
    })
}

export const fetchProduct = (ID) => async dispatch => {
    const res = await axios.get(`/api/products/${ID}`)
    dispatch({
        type: FETCH_PRODUCT,
        payload: res.data
    })
}

export const fetchProductsAttribute = (ID) => async dispatch => {
    const res = await axios.get(`/api/attributes/inProduct/${ID}`)
    dispatch({
        type: FETCH_PRODUCT_ATTRIBUTE,
        payload: res.data
    })
}

export const fetchDepartments = () => async dispatch => {
    const res = await axios.get('/api/departments')
    dispatch({
        type: FETCH_DEPARTMENTS,
        payload: res.data
    })
}



export const fetchCatagories = () => async dispatch => {
    const res = await axios.get('/api/categories')
    dispatch({
        type: FETCH_CATAGORIES,
        payload: res.data
    })
}


export const fetchProductsByID = (id) => async dispatch => {
    const res = await axios.get(`/api/products/inCategory/${id}`)
    dispatch({
        type: FETCH_PRODUCTS_BY_ID,
        payload: res.data
    })
}

// export const addToCart = (item) => {
//     return {
//         type: ADD_TO_CART,
//         payload: item
//     }
// }

export const addToCart = (item) => async dispatch => {
    const res = await axios.post(`/api/shoppingcart/add`, item)
    dispatch({
        type: ADD_TO_CART,
        payload: res.data
    })
}

export const getCart = (cart_id) => async dispatch => {
    const res = await axios.get(`/api/shoppingcart/${cart_id}`)
    dispatch({
        type: GET_CART,
        payload: res.data
    })
}


export const getUniqueCartID = (cart_id) => async dispatch => {
    const res = await axios.get(`/api/shoppingcart/generateUniqueId`)
    dispatch({
        type: GET_CART_ID,
        payload: res.data.cart_id
    })
}

export const deleteCartItem = (item_id) => async dispatch => {
    await axios.delete(`/api/shoppingcart/removeProduct/${item_id}`)
    dispatch({
        type: DELETE_CART_ID
    })
}


export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token)
    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}

