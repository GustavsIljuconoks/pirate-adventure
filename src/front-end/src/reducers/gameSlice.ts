import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  player1: {
    player1: string
    id: string
  } | null

  player2: {
    player2: string
    id: string
  } | null
}

const initialState: GameState = {
  player1: null,
  player2: null
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayer1: (
      state,
      action: PayloadAction<{ player1: string; id: string }>
    ) => {
      state.player1 = action.payload
    },
    setPlayer2: (
      state,
      action: PayloadAction<{ player2: string; id: string }>
    ) => {
      state.player2 = action.payload
    }
  }
})

export const { setPlayer1, setPlayer2 } = gameSlice.actions
export default gameSlice.reducer
