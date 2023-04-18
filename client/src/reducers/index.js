import { combineReducers } from "redux";
import productReducer from './productReducer'
import sessionReducer from './sessionReducer'
import { allUserReducer, currentUserReducer } from './userReducer'

export default combineReducers({
    productReducer,
    sessionReducer,
    allUserReducer,
    currentUserReducer
})