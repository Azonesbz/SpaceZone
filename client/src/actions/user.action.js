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
export const NUMBER_OF_USER = "NUMBER_OF_USER"
export const EDIT_USER_PROFIL = "EDIT_USER_PROFIL"


const listeners = {}

// Fonction pour ajouter une fonction d'écoute pour un événement
export const subscribe = (eventType, listener) => {
  if (!listeners[eventType]) {
    listeners[eventType] = []
  }
  listeners[eventType].push(listener)
}

// Fonction pour supprimer une fonction d'écoute pour un événement
export const unsubscribe = (eventType, listener) => {
  if (!listeners[eventType]) {
    return
  }
  const index = listeners[eventType].indexOf(listener)
  if (index !== -1) {
    listeners[eventType].splice(index, 1)
  }
}

// Fonction pour appeler toutes les fonctions d'écoute pour un événement
const notifyListeners = (eventType, payload) => {
  if (!listeners[eventType]) {
    return
  }
  listeners[eventType].forEach(listener => {
    listener(payload)
  })
}

export const getAllUser = () => {
    return async (dispatch) => {
        return axios.get('http://localhost:3001/users').then(res => {
            dispatch({ type: GET_ALL_USERS, payload: res.data.allUsers })
            dispatch({ type: NUMBER_OF_USER, payload: res.data.count })
            notifyListeners(GET_ALL_USERS, res.data.allUsers)
        })
    }
}

export const addUser = (data) => {
    return async (dispatch) => {
        return axios.post('http://localhost:3001/users/new', data).then(res => { // J'envoie les données au serveur et je récupère la réponse
            console.log(res)
            localStorage.setItem('token', res.data.tokenData.token)
            dispatch({ type: ADD_USER, payload: res.data.tokenData})
            dispatch({ type: SET_USER, payload: res.data.tokenData})
            dispatch({ type: SET_SESSION_TRUE, payload: {Authorization: true}})
            return res
        })
    }
}
export const loginUser = (data) => {
    return async (dispatch) => {
        return axios.post('http://localhost:3001/users/login', data).then(res => {
            localStorage.setItem('token', res.data.tokenData.token)
            dispatch({ type: SET_USER, payload: res.data.tokenData})
            dispatch({ type: SET_SESSION_TRUE, payload: {Authorization: true}})
            return res
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
        return axios.delete(`http://localhost:3001/deleteUser/${id}`).then(() => {
            dispatch({ type: DELETE_USER, payload: id})
        })
    }
}

// Update user information from back-office

export const updateUser = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/updateUser/${data.id}`, data).then(res => {
            dispatch({ type: UPDATE_USER, payload: res.data.success})
        })
    }
}
export let editUsername = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/editUsername/${data.id}`, data).then(res => {
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data.token)
            dispatch({type: EDIT_USER_PROFIL, payload: {username: res.data.success}})
        })
    }
}
export let editEmail = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/editEmail/${data.id}`, data).then(res => {
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data.token)
            dispatch({type: EDIT_USER_PROFIL, payload: {email: res.data.success}})
        })
    }
}
export let editNumberPhone = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/editNumberPhone/${data.id}`, data).then(res => {
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data.token)
            dispatch({type: EDIT_USER_PROFIL, payload: {number_phone: res.data.success}})
        })
    }
}
export let editFirstName = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/editFirstName/${data.id}`, data).then(res => {
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data.token)
            dispatch({type: EDIT_USER_PROFIL, payload: {first_name: res.data.success}})
        })
    }
}
export let editPicture = (data) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/upload`, data).then(res => {
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data.token)
            dispatch({type: EDIT_USER_PROFIL, payload: {url: res.data.url}})
        })
    }
}