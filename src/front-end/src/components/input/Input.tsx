import '@styles/inputs/Input.css'
import { FC } from 'react'

interface InputProps {
  label?: string
  value: string
  name: string
  placeholder: string
  type: string
  required?: boolean
  error?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({
  label,
  value,
  name,
  placeholder,
  type,
  onChange,
  required,
  error
}) => (
  <label className="form-control">
    <span className="label-text">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="input w-full"
      required={required}
    />
    <span className="error-text">{error}</span>
  </label>
)
