import { DndContext, Modifiers, UniqueIdentifier } from '@dnd-kit/core'
import { ReactElement, useState } from 'react'
import style from 'styles/field/GameBoard.module.css'
import { ISqaureDroppable } from 'types/Square'
import createGrid from 'utils/createGrid'
import ShipDraggable from './Ship'
import Sqaure from './Sqaure'

interface GameBoardProps {
	modifiers?: Modifiers
}

export default function GameBoard({ modifiers }: GameBoardProps): ReactElement {
	const grid: ISqaureDroppable[] = createGrid()
	const [isDragging, setIsDragging] = useState(false)
	const [parent, setParent] = useState<UniqueIdentifier | null>(null)

	const item = (
		<ShipDraggable
			id="skipper"
			label="he"
			style={{
				opacity: isDragging ? 0 : undefined
			}}
			dragging={isDragging}
		/>
	)

	return (
		<div className={style['game-board']}>
			<DndContext
				modifiers={parent === null ? undefined : modifiers}
				onDragStart={() => setIsDragging(true)}
				onDragEnd={({ over }) => {
					setParent(over ? over.id : null)
					setIsDragging(false)
				}}
				onDragCancel={() => setIsDragging(false)}>
				{Object.keys(grid).map((sqaure) => (
					<Sqaure
						{...grid[parseInt(sqaure)]}
						key={grid[parseInt(sqaure)].id}
						id={grid[parseInt(sqaure)].id}
						dragging={isDragging}>
						{parent === grid[sqaure].id ? item : null}
					</Sqaure>
				))}
				<div>{parent === null ? item : null}</div>
			</DndContext>
		</div>
	)
}
