import { ADD_USER, GET_ALL_USERS } from "../actions/user.action"

const initialState = {}

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_USERS:
            return action.payload
        case ADD_USER:
            return [action.payload, ...state]
        default: 
            return state
    }
}