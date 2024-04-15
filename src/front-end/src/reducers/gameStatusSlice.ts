import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameDto } from 'types/webapi'

interface GameStatus {
  data: GameDto
}

let initialState: GameStatus = {
  data: {} as GameDto
}

export const gameStatussSlice = createSlice({
  name: 'setGameStatus',
  initialState,
  reducers: {
    setGameStateData: (state, action: PayloadAction<GameDto>) => {
      state.data = action.payload
    }
  }
})

export const { setGameStateData } = gameStatussSlice.actions
export default gameStatussSlice.reducer
