import axios from "axios"
import { SET_USER } from "./user.action"

export const SET_SESSION_FALSE = "SET_SESSION_FALSE"
export const SET_SESSION_TRUE = "SET_SESSION_TRUE"

export const sessionIsValid = () => {
    return (dispatch) => {
        const token = window.localStorage.getItem('token')
        if(!token){
            dispatch({ type: SET_SESSION_FALSE, payload: {Authorization: false}})
            dispatch({ type: SET_USER, payload: ""})
            return
        }
        return axios.post(`http://localhost:3001/api/session`, {token: token})
        .then(
            response => {
                console.log(response)
                if(response.status === 200){
                    dispatch({ type: SET_SESSION_TRUE, payload: {Authorization: true}})
                    dispatch({ type: SET_USER, payload: response.data.decoded})
                }
            }
        )
        .catch(err => {
            console.log(err.response.status)
            if (err.response.status === 401){
                console.error('ok')
                localStorage.removeItem('token')
                dispatch({ type: SET_SESSION_FALSE, payload: {Authorization: false}})
            }
        })
    }
}