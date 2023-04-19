import { ADD_USER, LOGIN_USER, GET_ALL_USERS, DELETE_USER_DATA, SET_USER } from "../actions/user.action"

const initialState = {}

export function allUserReducer(state = initialState, action){
    console.log('Action:', action);
    switch(action.type){
        case GET_ALL_USERS:
            return action.payload
        case ADD_USER:
            return [action.payload, ...state]
        case LOGIN_USER:
            return [action.payload, ...state]
        default: 
            return state
    }
}

export function currentUserReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return action.payload
        case DELETE_USER_DATA:
            return action.payload
        default:
            return state
    }
}

// Combiner les reducers en un seul reducer