import axios from "axios";
import { FETCH_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATAGORIES, FETCH_PRODUCTS_BY_ID, FETCH_PRODUCT, FETCH_PRODUCT_ATTRIBUTE, ADD_TO_CART } from './types'

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
    const res = await axios.get(`/api/productsAttribute/${ID}`)
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
    const res = await axios.get('/api/catagories')
    dispatch({
        type: FETCH_CATAGORIES,
        payload: res.data
    })
}


export const fetchProductsByID = (id) => async dispatch => {
    const res = await axios.get(`/api/productbycategory/${id}`)
    dispatch({
        type: FETCH_PRODUCTS_BY_ID,
        payload: res.data
    })
}

export const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item
    }
}


