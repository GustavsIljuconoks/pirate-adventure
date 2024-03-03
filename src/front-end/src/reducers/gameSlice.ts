import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  currentGame: {
    player1: string
    id: string
  } | null
}

const initialState: GameState = {
  currentGame: null
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (
      state,
      action: PayloadAction<{ player1: string; id: string }>
    ) => {
      state.currentGame = action.payload
    }
  }
})

export const { setCurrentGame } = gameSlice.actions
export default gameSlice.reducer
