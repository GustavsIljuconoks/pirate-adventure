import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers/gameSlice'

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    game: gameReducer
  }
})

export type AppDispatch = typeof store.dispatch
