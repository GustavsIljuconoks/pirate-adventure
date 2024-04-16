import { configureStore } from '@reduxjs/toolkit'
import apiDataReducer from './reducers/apiDataSlice'
import gamePlayerReducer from './reducers/gamePlayersSlice'
import gameReducer from './reducers/gameSlice'
import gameStateDataReducer from './reducers/gameStatusSlice'
import shipReducer from './reducers/shipSaveSlice'

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    game: gameReducer,
    apiData: apiDataReducer,
    shipSave: shipReducer,
    updatePlayers: gamePlayerReducer,
    gameStatusData: gameStateDataReducer
  }
})

export type AppDispatch = typeof store.dispatch
