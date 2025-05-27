import { Dispatch, SetStateAction } from 'react'
import { ChatMessages } from 'types/Player'
import style from '../../styles/chat/Chat.module.css'
import SendMessageForm from './SendMessageForm'

interface ChatRoomProps {
  messages: ChatMessages[]
  sendMessage: (message: string) => Promise<void>
  setMessage: Dispatch<SetStateAction<string>>
  message: string
}

export default function ChatRoom({
  messages,
  message,
  sendMessage,
  setMessage
}: ChatRoomProps) {
  return (
    <div className={style.chatContainer}>
      <div className={style.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={style.message}>
            <span className={style.username}>{msg.user}: </span>
            <span className={style.messageText}>{msg.message}</span>
          </div>
        ))}
      </div>
      <SendMessageForm
        message={message}
        handleSendMessage={sendMessage}
        setMessage={setMessage}
      />
    </div>
  )
}
