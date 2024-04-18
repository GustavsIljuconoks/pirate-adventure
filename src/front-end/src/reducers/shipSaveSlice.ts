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
    setShipsForPlayer: (
      state,
      action: PayloadAction<{ playerId: number; ship: ShipDto }>
    ) => {
      const { playerId } = action.payload
      if (playerId === 1) {
        state.player1Ships.push(action.payload.ship)
      } else if (playerId === 2) {
        state.player2Ships.push(action.payload.ship)
      }
    },

    deleteShipsForPlayer: (
      state,
      action: PayloadAction<{ playerId: number; shipId: number }>
    ) => {
      const { playerId, shipId } = action.payload
      if (playerId === 1) {
        state.player1Ships = state.player1Ships.filter(
          (ship) => ship.id !== shipId
        )
      }
      if (playerId === 2) {
        state.player2Ships = state.player2Ships.filter(
          (ship) => ship.id !== shipId
        )
      }
    }
  }
})

export const { setShipsForPlayer, deleteShipsForPlayer } = shipSlice.actions
export default shipSlice.reducer
