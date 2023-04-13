import axios from 'axios'

export const GET_PRODUCTS = "GET_PRODUCTS"
export const ADD_PRODUCTS = "ADD_PRODUCT"

export const getProduct = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/product').then(res => {
            dispatch({ type: GET_PRODUCTS, payload: res.data.product })
        })
    }
}
export const addProduct = (data) => {
    console.log(data)
    return (dispatch) => {
        return axios.post('http://localhost:3001/product', data).then(res => {
            console.log(res.data.response.insertId)
            dispatch({ type: ADD_PRODUCTS, payload: {...data, id: res.data.response.insertId}})
        })
    }
}