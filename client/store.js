import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './src/reducers'
import { getProduct } from './src/actions/product.action'
import { getAllUser, sessionIsValid } from './src/actions/user.action'


export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

store.dispatch(getProduct())
store.dispatch(sessionIsValid())
store.dispatch(getAllUser())