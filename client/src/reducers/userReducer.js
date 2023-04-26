import { ADD_USER, LOGIN_USER, GET_ALL_USERS, SET_USER, SET_USER_PSEUDO, NUMBER_OF_USER, UPDATE_USER, UPDATE_USER_USERNAME } from "../actions/user.action"

const initialState = {}

export function allUserReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_USERS:
            return action.payload
        case ADD_USER:
            return [action.payload, ...state]
        case LOGIN_USER:
            return [action.payload, ...state]
        case NUMBER_OF_USER:
            return {...state, number: action.payload}
        default: 
            return state
    }
}

export function currentUserReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return action.payload
        case SET_USER_PSEUDO:
            return {
                ...state,
                user_id: action.payload
            }
        case UPDATE_USER_USERNAME:
            return {
                ...state,
                username: action.payload
            }

        default:
            return state
    }
}

// Combiner les reducers en un seul reducer