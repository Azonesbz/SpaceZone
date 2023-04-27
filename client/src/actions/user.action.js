import axios from 'axios'
import jwt_decode from "jwt-decode";
import { SET_SESSION_FALSE, SET_SESSION_TRUE } from './session.action';

export const ADD_USER = "ADD_USER"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const SESSION_IS_VALID = "SESSION_IS_VALID"
export const USER_LOGOUT = "USER_LOGOUT"
export const LOGIN_USER = "LOGIN_USER"
export const UPDATE_USER = "UPDATE_USER"
export const DELETE_USER = "DELETE_USER"
export const SET_USER = "SET_USER"
export const SET_USER_PSEUDO = "SET_USER_PSEUDO"
export const NUMBER_OF_USER = "NUMBER_OF_USER"
export const EDIT_USER_PROFIL = "EDIT_USER_PROFIL"




export const getAllUser = () => {
    return async (dispatch) => {
        return axios.get('http://localhost:3001/users').then(res => {
            dispatch({ type: GET_ALL_USERS, payload: res.data.response })
        })
    }
}
export const getUserNumber = () => {
    return async (dispatch) => {
        return axios.get('http://localhost:3001/countUser').then(res => {
            dispatch({ type: NUMBER_OF_USER, payload: res.data.result })
        })
    }
}

export const addUser = (data) => {
    return async (dispatch) => {
        return axios.post('http://localhost:3001/users/new', data).then(res => { // J'envoie les données au serveur et je récupère la réponse
        console.log(res.data)
            localStorage.setItem('token', res.data.tokenData.token)
            dispatch({ type: ADD_USER, payload: res.data.tokenData})
            dispatch({ type: SET_USER, payload: res.data.tokenData})
            dispatch({ type: SET_SESSION_TRUE, payload: {Authorization: true}})
        })
    }
}
export const loginUser = (data) => {
    return async (dispatch) => {
        return axios.post('http://localhost:3001/users/login', data).then(async res => {
            localStorage.setItem('token', res.data.tokenData.token)
            dispatch({ type: SET_USER, payload: res.data.tokenData})
            dispatch({ type: SET_SESSION_TRUE, payload: {Authorization: true}})
        })
    }
}

export const userLogout = (id) => {
    return async (dispatch) => {
        return axios.put(`http://localhost:3001/users/${id}`).then(() => {
            window.localStorage.removeItem('token')
            dispatch({ type: SET_USER, payload: ""})
            dispatch({type: SET_SESSION_FALSE, payload: {Authorization: false}})
        })
    }
}



// Delete user from back-office

export const deleteUser = (id) => {
    return (dispatch) => {
        console.log(id)
        axios.delete(`http://localhost:3001/deleteUser/${id}`).then(res => {
            dispatch({ type: DELETE_USER, payload: id})
        })
    }
}

// Update user information from back-office

export const updateUser = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/updateUser/${data.id}`, data).then(res => {
            console.log(res)
            dispatch({ type: UPDATE_USER, payload: res.data})
        })
    }
}
export let editUsername = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/editUsername/${data.id}`, data).then(res => {
            dispatch({type: EDIT_USER_PROFIL, payload: {username: res.data.username}})
        })
    }
}
export let editEmail = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/editEmail/${data.id}`, data).then(res => {
            dispatch({type: EDIT_USER_PROFIL, payload: {email: res.data.email}})
        })
    }
}
export let editNumberPhone = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/editNumberPhone/${data.id}`, data).then(res => {
            dispatch({type: EDIT_USER_PROFIL, payload: {number_phone: res.data.numberPhone}})
        })
    }
}
export let editFirstName = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/editFirstName/${data.id}`, data).then(res => {
            dispatch({type: EDIT_USER_PROFIL, payload: {first_name: res.data.firstName}})
        })
    }
}
export let editPicture = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/upload/${data.id}`, data).then(res => {
            dispatch({type: EDIT_USER_PROFIL, payload: {url: res.data.url}})
        })
    }
}