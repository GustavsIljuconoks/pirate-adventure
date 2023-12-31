import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import classNames from 'classnames'
import type { FC } from 'react'
import React from 'react'

import styleShip from 'styles/field/Ship.module.css'
import { Ship } from 'types/Ship'

const ShipDraggable: FC<Ship> = ({
	id,
	label,
	dragOverlay,
	dragging,
	style
}) => {
	const { attributes, listeners, setNodeRef, transform } = useSortable({
		id: id,
		data: { title: label }
	})

	const transformStyle: { transform: string | undefined } = {
		transform: CSS.Translate.toString(transform)
	}

	return (
		<div
			className={classNames(
				styleShip.ship,
				dragging && styleShip.dragging,
				dragOverlay && styleShip.dragOverlay
			)}
			style={
				{
					transformStyle,
					...style,
					'--translate-x': `${transform?.x ?? 0}px`,
					'--translate-y': `${transform?.y ?? 0}px`
				} as React.CSSProperties
			}
			ref={setNodeRef}
			{...listeners}
			{...attributes}>
			{label}
		</div>
	)
}

export default ShipDraggable
