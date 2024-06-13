import { Action, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import apiDataReducer from './reducers/apiDataSlice'
import gamePlayerReducer from './reducers/gamePlayersSlice'
import gameReducer from './reducers/gameSlice'
import gameStateDataReducer from './reducers/gameStatusSlice'
import shipReducer from './reducers/shipSaveSlice'
import soundSaveReducer from './reducers/soundSaveSlice'
import userSaveReducer from './reducers/userSlice'

export type RootState = ReturnType<typeof store.getState>

const persistConfig = {
  key: 'root',
  storage,
  purge: () => {
    storage.removeItem('persist:root')
  }
}

const appReducer = combineReducers({
  game: gameReducer,
  apiData: apiDataReducer,
  shipSave: shipReducer,
  updatePlayers: gamePlayerReducer,
  gameStatusData: gameStateDataReducer,
  userSave: userSaveReducer,
  soundSave: soundSaveReducer
})

const rootReducer = (state, action: Action) => {
  if (action.type === 'CLEAR') {
    const { userSave, ...restOfState } = state
    return appReducer({ userSave }, action)
  }

  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
