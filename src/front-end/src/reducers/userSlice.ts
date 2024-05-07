import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Auth {
  name: string
  isAuthenticated: boolean
}

let initialState: Auth = {
  name: '',
  isAuthenticated: false
}

export const userAuthSlice = createSlice({
  name: 'updatePlayers',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => {
      state.name = action.payload.name
      state.isAuthenticated = action.payload.isAuthenticated
    }
  }
})

export const { setAuth } = userAuthSlice.actions
export default userAuthSlice.reducer
