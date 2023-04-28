import { ADD_PRODUCTS, GET_PRODUCT_PAGE, GET_PRODUCT_BY_ID, NUMBER_OF_PRODUCTS, GET_ALL_PRODUCTS } from "../actions/product.action";

const initialState = {}

export default function productReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return {...state, allProduct: action.payload}
        case GET_PRODUCT_PAGE:
            return {...state, productPage: action.payload}
        case ADD_PRODUCTS:
            return [...state.productPage, action.payload]
        case NUMBER_OF_PRODUCTS:
            return {...state, number: action.payload}
        case GET_PRODUCT_BY_ID:
            return {...state, productId: action.payload}
        default: 
            return state
    }
}