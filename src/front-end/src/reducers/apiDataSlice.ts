import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateGameResponseDto } from 'types/webapi'

interface ApiDataState {
  data: CreateGameResponseDto[]
  link: string
}

const initialState: ApiDataState = {
  data: [],
  link: ''
}

export const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    setApiData: (state, action: PayloadAction<CreateGameResponseDto[]>) => {
      state.data = action.payload
    },
    setGameState: (state, action: PayloadAction<string>) => {
      state.link = action.payload
    }
  }
})

export const { setApiData, setGameState } = apiDataSlice.actions
export default apiDataSlice.reducer
