import axios from 'axios'

export const GET_PRODUCTS = "GET_PRODUCTS"

export const getProduct = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/product').then(res => {
            dispatch({ type: GET_PRODUCTS, payload: res.data.product })
        })
    }
}