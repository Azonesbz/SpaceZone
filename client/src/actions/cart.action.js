import axios from "axios"

export const ADD_PRODUCTS_CART = "ADD_PRODUCTS_CART"

export let addProductCart = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/cart/newItem', data).then(res => {
            dispatch({ type: ADD_PRODUCTS_CART, payload: res.data })
        })
    }
}