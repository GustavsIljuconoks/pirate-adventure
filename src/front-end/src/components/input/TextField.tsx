import type { FC } from 'react'
import 'styles/inputs/TextField.css'

interface TextFieldProperties {
  placeholder: string
  value: string
  type: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const TextField: FC<TextFieldProperties> = ({
  placeholder,
  value,
  type,
  onChange,
  className
}) => (
  <input
    className={`input-field ${className || ''}`}
    placeholder={placeholder}
    value={value}
    type={type}
    onChange={onChange}
  />
)

export default TextField
