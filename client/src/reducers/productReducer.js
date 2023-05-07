import { ADD_PRODUCTS, GET_PRODUCT_PAGE, GET_PRODUCT_BY_ID, NUMBER_OF_PRODUCTS, GET_ALL_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT_ID } from "../actions/product.action";

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
            return {...state, productId: action.payload[0]}
        case UPDATE_PRODUCT:
            return {
                ...state,
                allProduct: state.allProduct.map((product) => {
                if(product.id === action.payload[0].id){
                    return {
                    ...product,
                    title: action.payload[0].title,
                    username: action.payload[0].username,
                    price: action.payload[0].price,
                    inventory: action.payload[0].inventory
                    };
                } else {
                    return product;
                }
                })
            };
        case DELETE_PRODUCT_ID:
            return {...state, allProduct: state.allProduct.filter((product) => product.id != action.payload)}
        default: 
            return state
    }
}