import axios from 'axios'
import jwt_decode from "jwt-decode";

export const ADD_USER = "ADD_USER"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const SESSION_IS_VALID = "SESSION_IS_VALID"
export const USER_LOGOUT = "USER_LOGOUT"
export const LOGIN_USER = "LOGIN_USER"
export const SAVE_USER_DATA = "SAVE_USER_DATA"
export const DELETE_USER_DATA = "DELETE_USER_DATA"
export const SET_USER = "SET_USER"
export const SET_USER_PSEUDO = "SET_USER_PSEUDO"



export const getAllUser = () => {
    return async (dispatch) => {
        return axios.get('http://localhost:3001/users').then(res => {
            dispatch({ type: GET_ALL_USERS, payload: res.data.response })
        })
    }
}

export const addUser = (data) => {
    return async (dispatch) => {
        return axios.post('http://localhost:3001/users/new', data).then(res => { // J'envoie les données au serveur et je récupère la réponse
            localStorage.setItem('token', res.data.token)
            const token = localStorage.getItem('token')
            const decodedToken = jwt_decode(token);
            dispatch({ type: ADD_USER, payload: res.data})
            dispatch({ type: SET_USER, payload: decodedToken})
        })
    }
}
export const loginUser = (data) => {
    return async (dispatch) => {
        return axios.post('http://localhost:3001/users/login', data).then(async res => {
            localStorage.setItem('token', res.data.token)
            const token = localStorage.getItem('token')
            const decodedToken = jwt_decode(token);
            dispatch({ type: SET_USER, payload: decodedToken})
        })
    }
}

export const userLogout = (id) => {
    return async (dispatch) => {
        return axios.put(`http://localhost:3001/users/${id}`).then(() => {
            window.localStorage.removeItem('token')
            dispatch({ type: SET_USER, payload: ""})
        })
    }
}



// Update user information

export const updateUserPseudo = (id, data) => {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        axios.put(`http://localhost:3001/updatePseudo/${id}`, {pseudo: data.pseudo, token}).then(res => {
            dispatch({ type: SET_USER_PSEUDO, payload: res.user_id})
        })
    }
}