import {
	DndContext,
	DragOverEvent,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { ReactElement, useState } from 'react'
import style from 'styles/field/GameBoard.module.css'
import { createField } from 'utils/creators/createGrid'
import { createShipPositions, createShips } from 'utils/creators/createShips'
import { isPositionValid } from 'utils/validators/isPositionValid'
import DraggableShip from './DraggableShip'
import DroppableSquare from './DroppableSquare'
import FieldShip from './FieldShip'
import FieldWrapper from './FieldWrapper'

export default function GameBoard(): ReactElement {
	const [field, setPlayerField] = useState(createField())
	const [hoveredCellId, setHoveredCellId] = useState<number>()
	const [draggedShipId, setDraggedShipId] = useState<number>()
	const [playerShips, setPlayerShips] = useState(createShips())
	const [axis, setAxis] = useState<'x' | 'y'>('x')
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
	const [shipBeingRemovedId, setShipBeingRemovedId] = useState<number>()

	const handleDragEnd = () => {
		if (hoveredCellId === undefined || !draggedShipId) return

		const shipLength = playerShips[draggedShipId].length

		if (isPositionValid(field, hoveredCellId, shipLength, axis)) {
			//get dropped ships positions
			const positions = createShipPositions(
				hoveredCellId,
				shipLength,
				axis
			)

			// set dropped ships new positions
			setPlayerShips((ships) => ({
				...ships,
				[draggedShipId]: {
					...ships[draggedShipId],
					positions,
					axis
				}
			}))

			// set ids in cells
			const fieldClone = JSON.parse(JSON.stringify(field))

			positions.forEach(
				(id) =>
					(fieldClone[id] = {
						...fieldClone[id],
						shipId: draggedShipId
					})
			)

			setPlayerField(fieldClone)
		}

		resetDnDState()
	}

	const handleDragOver = (event: DragOverEvent) => {
		setHoveredCellId(event.collisions?.at(0)?.id as number)
		setDraggedShipId(event.active.id as number)
	}

	const resetDnDState = () => {
		setHoveredCellId(undefined)
		setDraggedShipId(undefined)
	}

	const resetShipPosition = (id: number) => {
		setPlayerShips((ships) => ({
			...ships,
			[id]: {
				...ships[id],
				positions: []
			}
		}))
	}

	const resetCell = (id: number) => {
		setPlayerField(
			field.map((cell) => {
				return cell.shipId === id
					? {
							...cell,
							shipId: undefined
					  }
					: cell
			})
		)
	}

	const resetShipPlacement = (id: number) => {
		resetShipPosition(id)
		resetCell(id)
	}

	return (
		<div className="flex flex-col">
			<DndContext
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
				onDragCancel={resetDnDState}
				modifiers={[restrictToWindowEdges]}
				sensors={sensors}>
				<FieldWrapper>
					<div className={style['game-board']}>
						{field.map((data, id) => (
							<DroppableSquare
								field={field}
								data={data}
								key={id}
								cellId={id}
								hoveredCellId={hoveredCellId}
								draggedShipId={draggedShipId}
								axis={axis}
								ships={playerShips}
							/>
						))}
						{Object.entries(playerShips).map(([id, ship]) => (
							<FieldShip
								key={id}
								ship={ship}
								removeButtonHovered={
									Number(id) === shipBeingRemovedId
								}
								belongsTo="player"
							/>
						))}
					</div>
				</FieldWrapper>

				<div className="flex flex-wrap justify-center gap-1 lg:grid lg:grid-cols-2">
					{Object.entries(playerShips).map(([id, ship]) => (
						<DraggableShip
							key={id}
							id={Number(id)}
							ships={playerShips}
							ship={ship}
							resetShipPlacement={resetShipPlacement}
							setShipBeingRemovedId={setShipBeingRemovedId}
						/>
					))}
				</div>
			</DndContext>
		</div>
	)
}
