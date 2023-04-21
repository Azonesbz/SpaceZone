import axios from 'axios'

export const GET_PRODUCTS = "GET_PRODUCTS"
export const NUMBER_OF_PRODUCT = "NUMBER_OF_PRODUCT"
export const ADD_PRODUCTS = "ADD_PRODUCT"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"

export const getProduct = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/product', data).then(res => {
            dispatch({ type: GET_PRODUCTS, payload: res.data.product })
        })
    }
}
export const getAllProduct = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/allproduct').then(res => {
            console.log(res.data)
            dispatch({ type: NUMBER_OF_PRODUCT, payload: res.data.result })
        })
    }
}

export const addProduct = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/product/new', data).then(res => {
            console.log(res.data.response.insertId)
            dispatch({ type: ADD_PRODUCTS, payload: {...data, id: res.data.response.insertId}})
        })
    }
}
export const searchProduct = (data) => {
    console.log(data)
    return (dispatch) => {
        return axios.post('http://localhost:3001/search/product', data).then(res => {
            console.log(res)
            dispatch({ type: SEARCH_PRODUCTS, payload: res.data.product})
        })
    }
}