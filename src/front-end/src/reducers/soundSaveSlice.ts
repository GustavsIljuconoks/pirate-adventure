import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISound {
  music: boolean
  sound: boolean
}

let initialState: ISound = {
  music: true,
  sound: true
}

export const soundSaveSlice = createSlice({
  name: 'soundSave',
  initialState,
  reducers: {
    setMusic: (state, action: PayloadAction<{ music: boolean }>) => {
      state.music = action.payload.music
    },
    setSound: (state, action: PayloadAction<{ sound: boolean }>) => {
      state.sound = action.payload.sound
    }
  }
})

export const { setMusic, setSound } = soundSaveSlice.actions
export default soundSaveSlice.reducer
