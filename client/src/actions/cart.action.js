import axios from "axios"

export const ADD_PRODUCTS_CART = "ADD_PRODUCTS_CART"
export const GET_CARTS_PRODUCT = "GET_CARTS_PRODUCT"


export let getCarts = () => {
    return (dispatch) => {
        return axios.get(`http://localhost:3001/carts`).then(response => {
            console.log(response.data)
            dispatch({ type: GET_CARTS_PRODUCT, payload: response.data.cartItem })
        })
        .catch(err => {
            console.error(err)
        })
    }
}

export let addProductCart = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/cart/newItem', data).then(res => {
            dispatch({ type: ADD_PRODUCTS_CART, payload: res.data })
        })
    }
}