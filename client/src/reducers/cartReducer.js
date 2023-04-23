import { ADD_PRODUCTS_CART, GET_CARTS_PRODUCT } from "../actions/cart.action"

const initialState = {}

export default function cartReducer(state = initialState, action){
    switch(action.type){
        case ADD_PRODUCTS_CART:
            return [...state, action.payload]
        case GET_CARTS_PRODUCT:
            return action.payload
        default: 
            return state
    }
}