import { ADD_ORDER } from '../actions/types'


const initalState = {
    orderDetail: {},
    orders: [],
    orderPlaced: null
}
export const orderReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state,
                orderDetail: action.payload
            }
        case 'FETCH_ORDER':
            return {
                ...state,
                orders: action.payload
            }
        case 'SET_ORDER':
            return {
                ...state,
                orderPlaced: action.payload
            }
        default:
            return state
    }
}