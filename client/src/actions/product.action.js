import axios from 'axios'

export const GET_PRODUCT_PAGE = "GET_PRODUCT_PAGE"
export const NUMBER_OF_PRODUCTS = "NUMBER_OF_PRODUCTS"
export const ADD_PRODUCTS = "ADD_PRODUCT"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"


export let getProductPage = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/productPage', data).then(res => {
            dispatch({ type: GET_PRODUCT_PAGE, payload: res.data.product })
        })
    }
}
export let getAllProduct = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/allProduct').then(res => {
            console.log(res)
            dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.products })
        })
    }
}
export let getProductNumber = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/productNumber').then(res => {
            console.log(res.data)
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
