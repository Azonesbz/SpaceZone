import { ADD_PRODUCTS_CART } from "../actions/cart.action"

const initialState = {}

export default function cartReducer(state = initialState, action){
    switch(action.type){
        case ADD_PRODUCTS_CART:
            return action.payload
        default: 
            return state
    }
}