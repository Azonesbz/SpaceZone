import { DELETE_LIKE_PRODUCT, GET_LIKE_PRODUCTS, LIKE_PRODUCT } from "../actions/product.action"
import { ADD_USER, LOGIN_USER, GET_ALL_USERS, SET_USER, NUMBER_OF_USER, EDIT_USER_PROFIL, DELETE_USER, UPDATE_USER } from "../actions/user.action"

const initialState = {}

export function allUserReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_USERS:
            return {...state, users: action.payload}
        case ADD_USER:
            return [...state.users, action.payload]
        case LOGIN_USER:
            return [action.payload, ...state]
        case DELETE_USER:
            return {...state, users: state.users.filter((user) => user.id != action.payload)}
        case NUMBER_OF_USER:
            return {...state, number: action.payload}
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.payload[0].id){
                        return {
                        ...user,
                        username: action.payload[0].username,
                        email: action.payload[0].email,
                        name: action.payload[0].name,
                        };
                    } else {
                        return user;
                    }
                })
            };
        default: 
            return state
    }
}

export function currentUserReducer(state = initialState, action){
    switch(action.type){
        case SET_USER:
            return {...state, user: action.payload}
        case EDIT_USER_PROFIL:
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
        case GET_LIKE_PRODUCTS:
            return {...state, liked: action.payload}
        case LIKE_PRODUCT:
            return {
                ...state,
                liked: [...state.liked, action.payload]
            }
        case DELETE_LIKE_PRODUCT:
            return {...state, liked: state.liked.filter((productLike) => productLike.id != action.payload.id)}
        default:
            return state
    }
}

// Combiner les reducers en un seul reducer