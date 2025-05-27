import TextField from '@components/input/TextField'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import style from '../../styles/chat/Chat.module.css'

interface ChatForm {
  handleSendMessage: (message: string) => Promise<void>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}

export default function SendMessageForm({
  message,
  handleSendMessage,
  setMessage
}: ChatForm): ReactElement {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSendMessage(message)
      }}
      className={style.chatForm}
    >
      <TextField
        placeholder="Enter your message.."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={style.messageInput}
      />

      <button type="button" disabled={!message} className={style.sendButton}>
        <div>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.37325 20.9519C3.44476 20.6887 3.28671 20.3227 3.13587 20.0589C3.0889 19.9802 3.03796 19.904 2.98323 19.8305C1.68952 17.8685 0.999977 15.5701 1.00006 13.22C0.979026 6.47416 6.57276 1 13.4898 1C19.5223 1 24.5577 5.17909 25.7344 10.7266C25.9107 11.549 25.9997 12.3878 26 13.229C26 19.9844 20.622 25.5445 13.705 25.5445C12.6052 25.5445 11.1208 25.268 10.3113 25.0415C9.50184 24.8149 8.69355 24.5144 8.48502 24.4339C8.27174 24.3519 8.04524 24.3097 7.81675 24.3095C7.56718 24.3085 7.32001 24.3582 7.09019 24.4555L3.01388 25.9267C2.92457 25.9652 2.82995 25.9899 2.73323 26C2.6569 25.9998 2.58138 25.9844 2.51104 25.9548C2.4407 25.9251 2.37694 25.8819 2.32345 25.8274C2.26996 25.773 2.2278 25.7085 2.19942 25.6376C2.17104 25.5668 2.157 25.491 2.15811 25.4147C2.16312 25.3477 2.17521 25.2814 2.19417 25.2169L3.37325 20.9519Z"
              fill="#DADADA"
              stroke="#DADADA"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>
    </form>
  )
}
