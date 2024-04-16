import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GamePlayers } from 'types/Player'

interface GamePlayersState {
  players: GamePlayers
}

let initialState: GamePlayersState = {
  players: {
    me: {
      id: NaN,
      name: ''
    },
    enemy: {
      id: NaN,
      name: ''
    }
  }
}

export const gamePlayersSlice = createSlice({
  name: 'updatePlayers',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<GamePlayers>) => {
      state.players = action.payload
    }
  }
})

export const { setPlayers } = gamePlayersSlice.actions
export default gamePlayersSlice.reducer
