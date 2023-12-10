import { useDroppable } from '@dnd-kit/core'
import classNames from 'classnames'
import { type ReactElement } from 'react'
import style from 'styles/field/Square.module.css'
import type { ISqaureDroppable } from 'types/Square'

export default function Sqaure({
	id,
	row,
	column,
	children,
	dragging
}: ISqaureDroppable): ReactElement {
	const { isOver, setNodeRef } = useDroppable({
		id
	})

	return (
		<div
			ref={setNodeRef}
			className={classNames(
				style.square,
				`row-${row}`,
				`column-${column}`,
				dragging && style.dragging,
				isOver && style.over,
				id
			)}
			aria-label="Droppable square">
			{children}
		</div>
	)
}
