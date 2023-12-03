/* eslint-disable import/no-extraneous-dependencies */
import type { FC } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

import styleShip from 'styles/field/Ship.module.css'

interface IShipDraggable {
    children: string
}

const ShipDraggable: FC<IShipDraggable> = ({children}) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: children
	})
	const style: { transform: string | undefined } = {transform: CSS.Translate.toString(transform)}

	return (
		<div
			className={styleShip.ship}
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
        >
			{children}
		</div>
	)
}

export default ShipDraggable;