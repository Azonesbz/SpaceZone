import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './src/reducers'
import { getAllUser } from './src/actions/user.action'
import { sessionIsValid } from './src/actions/session.action'
import { getAllProduct } from './src/actions/product.action'
import { getCarts } from './src/actions/cart.action'
// import { getCarts } from './src/actions/cart.action'


export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

store.dispatch(sessionIsValid())
store.dispatch(getAllUser())
store.dispatch(getAllProduct())
store.dispatch(getCarts())
// store.dispatch(getCarts())