import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatMessages } from 'types/Player'

interface ChatState {
  isConnected: boolean
  messages: ChatMessages[]
}

const initialState: ChatState = {
  isConnected: false,
  messages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    addMessage: (state, action: PayloadAction<{ user: string; message: string; timestamp: string }>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    }
  }
})

export const { setConnectionStatus, addMessage, clearMessages } = chatSlice.actions
export default chatSlice.reducer 