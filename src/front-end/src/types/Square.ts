import { UniqueIdentifier } from '@dnd-kit/core'

export interface ISqaureDroppable {
	id: UniqueIdentifier
	column: number
	row: number
	initialValue: number
	isHighlighted: boolean
	children?: React.ReactNode
	dragging?: boolean
}
