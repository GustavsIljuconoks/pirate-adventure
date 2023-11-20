import type { FC } from 'react'
import 'styles/TextField.css'

interface TextFieldProperties {
	placeholder: string
	value: string
	type: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: FC<TextFieldProperties> = ({
	placeholder,
	value,
	type,
	onChange
}) => (
	<div>
		<input
			className="input-field"
			placeholder={placeholder}
			value={value}
			type={type}
			onChange={onChange}
		/>
	</div>
)

export default TextField
