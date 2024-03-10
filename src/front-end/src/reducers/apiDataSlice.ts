import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IApiResponse } from 'types/Api'

interface ApiDataState {
  data: IApiResponse[]
}

const initialState: ApiDataState = {
  data: []
}

export const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    setApiData: (state, action: PayloadAction<IApiResponse[]>) => {
      state.data = action.payload
    }
  }
})

export const { setApiData } = apiDataSlice.actions
export default apiDataSlice.reducer
