import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy
} from '@dnd-kit/sortable'
import { GridContainer } from 'components/Layout/Grid'
import { ReactElement, useCallback, useState } from 'react'
import style from 'styles/field/Shipyard.module.css'
import ShipDraggable from './Ship'

const notesData = [
	{
		id: 'item',
		content: 'Study English'
	},
	{
		id: 'flote',
		content: 'Flote'
	},
	{
		id: 'maza',
		content: 'mazaa'
	}
]

const Shipyard = (): ReactElement => {
	// const [items, setItems] = useState(notesData)
	const [items, setItems] = useState(
		Array.from({ length: 9 }, (_, i) => (i + 1).toString())
	)
	const [activeId, setActiveId] = useState<string | null>(null)
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

	const handleDragStart = useCallback((event: DragStartEvent) => {
		setActiveId(event.active.id)
	}, [])

	const handleDragEnd = useCallback((event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id.toString())
				const newIndex = items.indexOf(over!.id.toString())

				return arrayMove(items, oldIndex, newIndex)
			})
		}

		setActiveId(null)
	}, [])

	const handleDragCancel = useCallback(() => {
		setActiveId(null)
	}, [])

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}>
			<SortableContext items={items} strategy={rectSortingStrategy}>
				<div className={style.shipyard}>
					<GridContainer columns={3}>
						{items.map((note) => (
							<ShipDraggable key={note} id={note} label={note} />
						))}
					</GridContainer>
				</div>
			</SortableContext>
			<DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
				{activeId ? <ShipDraggable id={activeId} dragging /> : null}
			</DragOverlay>
		</DndContext>
	)
}

export default Shipyard
