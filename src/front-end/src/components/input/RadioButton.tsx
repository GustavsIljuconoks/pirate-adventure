import type { FC } from 'react'
import 'styles/RadioButton.css'

interface RadioButtonProperties {
	label: string
	type: string
	value: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: FC<RadioButtonProperties> = ({
	label,
	type,
	value,
	onChange
}) => (
	<div>
		<input
			className="input-radio"
			type="radio"
			id={label}
			name={type}
			value={value}
			onChange={onChange}
		/>
		<label className="label-radio" htmlFor={label}>
			{label}
		</label>
	</div>
)

export default RadioButton
