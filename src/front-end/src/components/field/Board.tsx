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
import { useDispatch, useSelector } from 'react-redux'
import { deleteShipsForPlayer, setShipsForPlayer } from 'reducers/shipSaveSlice'
import { RootState } from 'store'
import style from 'styles/field/GameBoard.module.css'
import { Columns } from 'types/Square'
import { createField } from 'utils/creators/createGrid'
import { createShipPositions, createShips } from 'utils/creators/createShips'
import { isPositionValid } from 'utils/validators/isPositionValid'
import DraggableShip from './DraggableShip'
import DroppableSquare from './DroppableSquare'
import FieldShip from './FieldShip'
import FieldWrapper from './FieldWrapper'

interface CellData {
  id: number
  column: string
  row: number
}

export default function GameBoard(): ReactElement {
  const [field, setPlayerField] = useState(createField())
  const [hoveredCell, setHoveredCell] = useState<CellData | undefined>()
  const [draggedShipId, setDraggedShipId] = useState<number>()
  const [playerShips, setPlayerShips] = useState(createShips())
  const [axis, setAxis] = useState<'x' | 'y'>('x')
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
  const [shipBeingRemovedId, setShipBeingRemovedId] = useState<number>()

  const dispatch = useDispatch()
  const gamePlayer1 = useSelector((state: RootState) => state.game.player1)
  const gamePlayer2 = useSelector((state: RootState) => state.game.player2)

  const handleDragEnd = () => {
    if (hoveredCell?.id === undefined || !draggedShipId) return

    const shipLength = playerShips[draggedShipId].length
    const shipName = playerShips[draggedShipId].name
    const shipId = playerShips[draggedShipId].id

    if (isPositionValid(field, hoveredCell.id, shipLength, axis)) {
      //get dropped ships positions
      const positions = createShipPositions(hoveredCell.id, shipLength, axis)

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

      const shipObject = {
        id: shipId,
        name: shipName,
        size: shipLength,
        headLocation: {
          row: hoveredCell.row,
          column: Columns[hoveredCell.column as keyof typeof Columns]
        },
        orientation: 1
      }

      setPlayerField(fieldClone)
      if (gamePlayer1) {
        dispatch(setShipsForPlayer({ playerId: 1, ship: shipObject }))
      }

      if (gamePlayer2) {
        dispatch(setShipsForPlayer({ playerId: 2, ship: shipObject }))
      }
    }

    resetDnDState()
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    const indexInfo = over?.data.current
    setHoveredCell({
      id: event.collisions?.at(0)?.id as number,
      column: indexInfo?.column,
      row: indexInfo?.row
    })
    setDraggedShipId(event.active.id as number)
  }

  const resetDnDState = () => {
    setHoveredCell(undefined)
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

    if (gamePlayer1) {
      dispatch(deleteShipsForPlayer({ playerId: 1, shipId: id }))
    }

    if (gamePlayer2) {
      dispatch(deleteShipsForPlayer({ playerId: 2, shipId: id }))
    }
  }

  return (
    <div className="flex flex-col">
      <DndContext
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragCancel={resetDnDState}
        modifiers={[restrictToWindowEdges]}
        sensors={sensors}
      >
        <FieldWrapper>
          <div className={style['game-board']}>
            {field.map((data, id) => (
              <DroppableSquare
                field={field}
                data={data}
                key={id}
                cellId={id}
                hoveredCellId={hoveredCell?.id}
                draggedShipId={draggedShipId}
                axis={axis}
                ships={playerShips}
              />
            ))}
            {Object.entries(playerShips).map(([id, ship]) => (
              <FieldShip
                key={id}
                ship={ship}
                removeButtonHovered={Number(id) === shipBeingRemovedId}
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
