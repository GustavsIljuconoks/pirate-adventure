import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShipDto } from '../types/webapi'

interface ShipStorage {
  ships: ShipDto[]
}

const initialState: ShipStorage = {
  ships: []
}

export const shipSlice = createSlice({
  name: 'shipSave',
  initialState,
  reducers: {
    setShips: (state, action: PayloadAction<ShipDto>) => {
      state.ships.push(action.payload)
    },
    deleteShipById: (state, action: PayloadAction<number>) => {
      state.ships = state.ships.filter((ship) => ship.id !== action.payload)
    }
  }
})

export const { setShips, deleteShipById } = shipSlice.actions
export default shipSlice.reducer
