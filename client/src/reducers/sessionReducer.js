import { SET_SESSION_FALSE, SET_SESSION_TRUE } from "../actions/session.action"


const initialState = {}

export default function sessionReducer(state = initialState, action){
    switch(action.type){
        case SET_SESSION_TRUE:
            return action.payload
        case SET_SESSION_FALSE:
            return action.payload
        default: 
            return state
    }
}