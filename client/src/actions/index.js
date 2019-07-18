import axios from "axios";
import { FETCH_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATAGORIES, FETCH_PRODUCTS_BY_ID, FETCH_PRODUCT, FETCH_PRODUCT_ATTRIBUTE, ADD_TO_CART, GET_CART, GET_CART_ID, DELETE_CART_ID, FETCH_USER, FETCH_TOTAL_AMOUNT, ADD_ORDER } from './types'

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



export const fetchCatagories = (deptID) => async dispatch => {
    const res = await axios.get(`/api/categories/inDepartment/${deptID}`)
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



export const addToCart = (item) => async dispatch => {
    const res = await axios.post(`/api/shoppingcart/add`, item)
    dispatch({
        type: ADD_TO_CART,
        payload: res.data
    })
}


export const fetchTotalAmount = (cart_id) => async dispatch => {
    const res = await axios.get(`/api/shoppingcart/totalAmount/${cart_id}`)
    dispatch({
        type: FETCH_TOTAL_AMOUNT,
        payload: res.data.total_amount
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


export const handleToken = (token, amount, inOrderID) => async dispatch => {
    const res = await axios.post('/api/stripe', { token, amount, inOrderID })
    dispatch({
        type: FETCH_USER,
        payload: res.data
    })
}


export const addOrder = (inCartId, inCustomerId) => async dispatch => {
    const res = await axios.post('/api/order', { inCartId, inCustomerId })
    console.log(res)
    dispatch({
        type: ADD_ORDER,
        payload: res.data
    })
}


export const fetchOrderByID = (inOrderID) => async dispatch => {
    const res = await axios.get(`/api/order/${inOrderID}`)

    dispatch({
        type: 'FETCH_ORDER',
        payload: res.data
    })
}

// amount, inCartId, inCustomerId