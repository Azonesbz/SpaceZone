import { ADD_PRODUCTS_CART, DELETE_CART, GET_CARTS_PRODUCT } from "../actions/cart.action"

const initialState = {}

export default function cartReducer(state = initialState, action){
    switch(action.type){
        case ADD_PRODUCTS_CART:
            const productToAdd = action.payload; // L'objet produit à ajouter au panier
            const updatedCart = [...state.cart, productToAdd]; // Ajoutez le produit au panier existant
            return { ...state, cart: updatedCart };
        case GET_CARTS_PRODUCT:
            return {...state, cart: action.payload}
        case DELETE_CART:
            return {...state, cart: action.payload}
        default: 
            return state
    }
}