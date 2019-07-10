import axios from "axios";
import { FETCH_PRODUCTS, FETCH_DEPARTMENTS, FETCH_CATAGORIES, FETCH_PRODUCTS_BY_ID } from './types'

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('/api/products')
    dispatch({
        type: FETCH_PRODUCTS,
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


