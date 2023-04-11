import { GET_PRODUCTS } from "../actions/product.action";

const initialState = {}

export default function productReducer(state = initialState, action){
    switch(action.type){
        case GET_PRODUCTS:
            return action.payload
        default: 
            return state
    }
}