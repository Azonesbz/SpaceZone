import { ADD_USER, LOGIN_USER, GET_ALL_USERS, SET_USER, SET_USER_PSEUDO, NUMBER_OF_USER, EDIT_USER_PROFIL } from "../actions/user.action"

const initialState = {}

export function allUserReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_USERS:
            return {...state, users: action.payload}
        case ADD_USER:
            return [...state, action.payload]
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
        case EDIT_USER_PROFIL:
            console.log(action.payload)
            if(action.payload.username){
                return {
                    ...state,
                    username: action.payload.username
                }
            } else if(action.payload.email){
                return {
                    ...state,
                    email: action.payload.email
                }
            }else if(action.payload.number_phone){
                console.log(action.payload)
                return {
                    ...state,
                    number_phone: action.payload.number_phone
                }
            }else if(action.payload.first_name){
                return {
                    ...state,
                    first_name: action.payload.first_name
                }
            } else if(action.payload.url){
                return {
                    ...state,
                    profil_picture: action.payload.url
                }
            }

        default:
            return state
    }
}

// Combiner les reducers en un seul reducer