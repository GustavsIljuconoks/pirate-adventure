import { configureStore } from '@reduxjs/toolkit'
import apiDataReducer from './reducers/apiDataSlice'
import gameReducer from './reducers/gameSlice'
import shipReducer from './reducers/shipSaveSlice'

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    game: gameReducer,
    apiData: apiDataReducer,
    shipSave: shipReducer
  }
})

export type AppDispatch = typeof store.dispatch
