import axios from 'axios'

export const GET_PRODUCTS_PAGE = "GET_PRODUCTS_PAGE"
export const NUMBER_OF_PRODUCTS = "NUMBER_OF_PRODUCTS"
export const ADD_PRODUCTS = "ADD_PRODUCT"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"


export let getProduct = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/product', data).then(res => {
            dispatch({ type: GET_PRODUCTS_PAGE, payload: res.data.product })
        })
    }
}
export let getAllProduct = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/allproduct').then(res => {
            dispatch({ type: NUMBER_OF_PRODUCTS, payload: res.data.result })
        })
    }
}
export let getProductById = (id) => {
    return (dispatch) => {
        return axios.get(`http://localhost:3001/product/${id}`).then(res => {
            dispatch({ type: GET_PRODUCT_BY_ID, payload: res.data.product})
        })
    }
}

export let addProduct = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/product/new', data).then(res => {
            dispatch({ type: ADD_PRODUCTS, payload: {...data, id: res.data.response.insertId}})
        })
    }
}
export let searchProduct = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/search/product', data).then(res => {
            dispatch({ type: SEARCH_PRODUCTS, payload: res.data.product})
        })
    }
}
