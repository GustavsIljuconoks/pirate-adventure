import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from '@microsoft/signalr'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setConnectionStatus } from 'reducers/chatSlice'
import { RootState } from 'store'
import { SERVER_URL } from '../../constants'
import ChatRoom from './ChatRoom'

export default function Chat() {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.chat.messages)
  const gameId = useSelector((state: RootState) => state.apiData.data[0]?.id)
  const userName = useSelector((state: RootState) => state.userSave.name)
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [message, setMessage] = useState('')

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !connection) return

    try {
      await connection.invoke('SendMessage', {
        Username: userName,
        Message: messageText
      })
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const createChat = async () => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl(`${SERVER_URL}/chat`, {
          withCredentials: false
        })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build()

      await conn.start()
      dispatch(setConnectionStatus(true))
      setConnection(conn)

      await conn.invoke('JoinRoom', {
        Username: userName,
        ChatRoom: gameId
      })
    } catch (error) {
      console.error(error)
      dispatch(setConnectionStatus(false))
    }
  }

  const cleanupConnection = async () => {
    if (connection) {
      try {
        await connection.stop()
        dispatch(setConnectionStatus(false))
        setConnection(null)
      } catch (error) {
        console.error('Error stopping connection:', error)
      }
    }
  }

  // For creating chat only once
  useEffect(() => {
    createChat()

    // Cleanup on unmount
    return () => {
      cleanupConnection()
    }
  }, [])

  useEffect(() => {
    if (!connection) return

    const handleMessage = (user: string, message: string) => {
      dispatch(
        addMessage({
          user,
          message,
          timestamp: new Date().toISOString()
        })
      )
    }

    const handleConnectionStatus = (connected: boolean) => {
      dispatch(setConnectionStatus(connected))
    }

    connection.on('RoomJoined', handleMessage)
    connection.on('ReceiveMessage', handleMessage)
    connection.onreconnecting(() => handleConnectionStatus(false))
    connection.onreconnected(async () => {
      handleConnectionStatus(true)
      try {
        await connection.invoke('JoinRoom', {
          Username: userName,
          ChatRoom: gameId
        })
      } catch (error) {
        console.error('Error rejoining room after reconnect:', error)
      }
    })
    connection.onclose(() => handleConnectionStatus(false))

    // Clean up
    return () => {
      connection.off('ReceiveMessage', handleMessage)
      connection.off('RoomJoined', handleMessage)
    }
  }, [connection, dispatch, gameId, userName])

  return (
    <ChatRoom
      messages={messages}
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
    />
  )
}
