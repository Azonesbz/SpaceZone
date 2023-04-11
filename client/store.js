import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './src/reducers'
import { getProduct } from './src/actions/product.action'


export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

store.dispatch(getProduct())