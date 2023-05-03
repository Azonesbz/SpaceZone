import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './src/reducers'
import { getAllUser, getUserNumber } from './src/actions/user.action'
import { sessionIsValid } from './src/actions/session.action'
import { getAllProduct, getProductNumber } from './src/actions/product.action'
import { getCarts } from './src/actions/cart.action'
// import { getCarts } from './src/actions/cart.action'


export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

store.dispatch(sessionIsValid())
store.dispatch(getAllUser())
store.dispatch(getProductNumber())
store.dispatch(getUserNumber())
store.dispatch(getAllProduct())
store.dispatch(getCarts())
// store.dispatch(getCarts())