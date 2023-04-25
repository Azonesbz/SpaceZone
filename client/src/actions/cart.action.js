import axios from "axios"

export const ADD_PRODUCTS_CART = "ADD_PRODUCTS_CART"
export const GET_CARTS_PRODUCT = "GET_CARTS_PRODUCT"


export let getCarts = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        let data = {
            token: token
        }
        return axios.post(`http://localhost:3001/carts`, data).then(response => {
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
            dispatch({ type: ADD_PRODUCTS_CART, payload: res.data.response })
        })
    }
}