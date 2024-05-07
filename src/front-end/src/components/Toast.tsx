import '@styles/Toast.css'

interface ToastProps {
  show: boolean
  message: string
  type: string
}

export const Toast = ({ show, type, message }: ToastProps) => {
  if (!show) {
    return null
  }

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div>{message}</div>
    </div>
  )
}
