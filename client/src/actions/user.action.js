import axios from 'axios'

export const ADD_USER = "ADD_USER"
export const GET_ALL_USERS = "GET_ALL_USERS"

export const getAllUser = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/users').then(res => {
            console.log(res)
            dispatch({ type: GET_ALL_USERS, payload: res.data.response })
        })
    }
}

export const addUser = (data) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/users/new', data).then(res => {
            console.log(res.data.response.insertId)
            dispatch({ type: ADD_USER, payload: {...data, id: res.data.response.insertId}})
        })
    }
}