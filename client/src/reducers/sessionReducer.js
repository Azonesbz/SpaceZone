import { SESSION_IS_VALID } from "../actions/user.action"

const initialState = {}

export default function userReducer(state = initialState, action){
    switch(action.type){
        case SESSION_IS_VALID:
            return action.payload
        default: 
            return state
    }
}