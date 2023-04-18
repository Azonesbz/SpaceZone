import axios from 'axios'

export const ADD_USER = "ADD_USER"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const SESSION_IS_VALID = "SESSION_IS_VALID"
export const USER_LOGOUT = "USER_LOGOUT"
export const LOGIN_USER = "LOGIN_USER"
export const SAVE_USER_DATA = "SAVE_USER_DATA"
export const DELETE_USER_DATA = "DELETE_USER_DATA"


export const getAllUser = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/users').then(res => {
            console.log(res.data.response)
            dispatch({ type: GET_ALL_USERS, payload: res.data.response })
        })
    }
}

export const addUser = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/users/new', data).then(res => { // J'envoie les données au serveur et je récupère la réponse
            window.localStorage.setItem('token', res.data.token)
            dispatch({ type: ADD_USER, payload: res.data})
        })
    }
}
export const loginUser = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/users/login', data).then(res => {
            console.log(res)
            window.localStorage.setItem('token', res.data.token)
            dispatch({ type: SAVE_USER_DATA, payload: {
                id: res.data.id, 
                email: res.data.email, 
                token: res.data.token,
                Authorization: true, 
            }})
        })
    }
}

export const userLogout = (id) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/users/${id}`, data).then(res => {
            window.localStorage.removeItem('token')
            dispatch({ type: DELETE_USER_DATA, payload: {Authorization: false}})
        })
    }
}
export const sessionIsValid = () => {
    return (dispatch) => {
        const token = window.localStorage.getItem('token')
        if(token){
            dispatch({ type: SESSION_IS_VALID, payload: {Authorization: true}})
        } else {
            dispatch({ type: SESSION_IS_VALID, payload: {Authorization: false}})
        }
    }
}