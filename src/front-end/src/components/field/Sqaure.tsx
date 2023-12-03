import { useState, type ReactElement } from 'react'
import type { SqaureProperties } from 'types/Square'
import 'styles/field/Square.css'

export default function Sqaure({
	row,
	column,
	initialValue,
}: SqaureProperties): ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [value, setValue] = useState(initialValue)

	const list = [
		'square',
		`row-${row}`,
		`col-${column}`
		// isHighlighted && 'highlight'
		// isActive && 'is-active'
	]
	return <div className={list.join(' ').trim()} />
}
