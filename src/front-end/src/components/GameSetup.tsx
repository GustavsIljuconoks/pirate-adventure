import { DndContext } from '@dnd-kit/core'
import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers'
import React, { useMemo, type ReactElement } from 'react'
import GameBoard from './field/Board'

export default function GameSetup(): ReactElement {
	const [gridSize, setGridSize] = React.useState(30)
	const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize])

	return (
		<DndContext modifiers={[snapToGrid, restrictToWindowEdges]}>
			<div className="flex flex-col">
				<GameBoard />
			</div>
		</DndContext>
	)
}
