import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './src/reducers'
function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
      case 'counter/incremented':
        return { value: state.value + 1 }
      case 'counter/decremented':
        return { value: state.value - 1 }
      default:
        return state
    }
  }

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
})