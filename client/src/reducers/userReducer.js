import { ADD_USER, LOGIN_USER, GET_ALL_USERS, SAVE_USER_DATA, DELETE_USER_DATA } from "../actions/user.action"

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
        case SAVE_USER_DATA:
            return [action.payload, ...state]
        case DELETE_USER_DATA:
            return action.payload
        default:
            return state
    }
}

// Combiner les reducers en un seul reducer