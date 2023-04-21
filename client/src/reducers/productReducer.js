import { ADD_PRODUCTS, GET_PRODUCTS, NUMBER_OF_PRODUCT } from "../actions/product.action";

const initialState = {}

export default function productReducer(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS:
            return {...state, product: action.payload}
        case ADD_PRODUCTS:
            return [action.payload, ...state]
        case NUMBER_OF_PRODUCT:
            return {...state, number: action.payload}
        default: 
            return state
    }
}