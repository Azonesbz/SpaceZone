import axios from 'axios'

export const GET_PRODUCT_PAGE = "GET_PRODUCT_PAGE"
export const NUMBER_OF_PRODUCTS = "NUMBER_OF_PRODUCTS"
export const ADD_PRODUCTS = "ADD_PRODUCT"
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS"
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const DELETE_PRODUCT_ID = "DELETE_PRODUCT_ID"
export const LIKE_PRODUCT = "LIKE_PRODUCT"
export const DELETE_LIKE_PRODUCT = "DELETE_LIKE_PRODUCT"
export const GET_LIKE_PRODUCTS = "GET_LIKE_PRODUCTS"


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
            dispatch({ type: GET_ALL_PRODUCTS, payload: res.data.products })
        })
    }
}
export let getProductNumber = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/productNumber').then(res => {
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
            dispatch({ type: ADD_PRODUCTS, payload: res.data.newProduct})
        })
    }
}

export let updateProduct = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/updateProduct/${data.id}`, data).then(res => {
            dispatch({type: UPDATE_PRODUCT, payload: res.data.response})
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
export let deleteProduct = (id) => {
    return (dispatch) => {
        return axios.delete(`http://localhost:3001/deleteProduct/${id}`).then(res => {
            dispatch({ type: DELETE_PRODUCT_ID, payload: id})
        })
    }
}
export let likeProduct = (data) => {
    return (dispatch) => {
        return axios.post(`http://localhost:3001/likeProduct`, data).then(res => {
            if(res.data.deleted){
                dispatch({type: DELETE_LIKE_PRODUCT, payload: res.data.deleted.deleted[0]})
            } else {
                dispatch({ type: LIKE_PRODUCT, payload: res.data.success})
            }
        })
    }
}
export let getLikeProduct = (id) => {
    return (dispatch) => {
        localStorage.getItem('token')
        return axios.get(`http://localhost:3001/getLikedProducts/${id}`).then(res => {
            dispatch({type: GET_LIKE_PRODUCTS, payload: res.data.response})
        })
    }
}
export let filterProduct = (data) => {
    return (dispatch) => {
        return axios.post(`http://localhost:3001/getFilterProduct`, data).then(res => {
            dispatch({type: GET_PRODUCT_PAGE, payload: res.data.product})
        })
    }
}