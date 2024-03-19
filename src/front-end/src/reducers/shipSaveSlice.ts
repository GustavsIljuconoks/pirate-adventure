import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShipDto } from '../types/webapi'

interface ShipStorage {
  player1Ships: ShipDto[]
  player2Ships: ShipDto[]
}

const initialState: ShipStorage = {
  player1Ships: [],
  player2Ships: []
}

export const shipSlice = createSlice({
  name: 'shipSave',
  initialState,
  reducers: {
    setShipsPlayer1: (state, action: PayloadAction<ShipDto>) => {
      state.player1Ships.push(action.payload)
    },
    setShipsPlayer2: (state, action: PayloadAction<ShipDto>) => {
      state.player2Ships.push(action.payload)
    },

    deletePlayer1Ship: (state, action: PayloadAction<number>) => {
      state.player1Ships = state.player1Ships.filter(
        (ship) => ship.id !== action.payload
      )
    },
    deletePlayer2Ship: (state, action: PayloadAction<number>) => {
      state.player2Ships = state.player2Ships.filter(
        (ship) => ship.id !== action.payload
      )
    }
  }
})

export const {
  setShipsPlayer1,
  setShipsPlayer2,
  deletePlayer1Ship,
  deletePlayer2Ship
} = shipSlice.actions
export default shipSlice.reducer
