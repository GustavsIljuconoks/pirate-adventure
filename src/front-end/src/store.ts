import { configureStore } from '@reduxjs/toolkit'
import apiDataReducer from './reducers/apiDataSlice'
import gameReducer from './reducers/gameSlice'

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    game: gameReducer,
    apiData: apiDataReducer
  }
})

export type AppDispatch = typeof store.dispatch
