import DraggableShip from '@components/field/DraggableShip'
import DroppableSquare from '@components/field/DroppableSquare'
import FieldShip from '@components/field/FieldShip'
import FieldWrapper from '@components/field/FieldWrapper'
import {
  DndContext,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import style from '@styles/field/GameBoard.module.css'
import { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteShipsForPlayer, setShipsForPlayer } from 'reducers/shipSaveSlice'
import { RootState } from 'store'
import { Orientation, ShipDto } from 'types/webapi'
import { createField } from 'utils/creators/createGrid'
import { createShipPositions, createShips } from 'utils/creators/createShips'
import { isPositionValid } from 'utils/validators/isPositionValid'

interface CellData {
  id: number
  column: number
  row: number
}

interface Ship extends ShipDto {
  dropped: boolean
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

    const shipLength = playerShips[draggedShipId].size
    const shipName = playerShips[draggedShipId].name
    const shipId = playerShips[draggedShipId].id
    const shipOrientation = playerShips[draggedShipId].orientation

    if (isPositionValid(field, hoveredCell.id, shipLength, axis)) {
      //get dropped ships positions
      const positions = createShipPositions(hoveredCell.id, shipLength, axis)

      // set dropped ships new positions
      setPlayerShips((ships) => ({
        ...ships,
        [draggedShipId]: {
          ...ships[draggedShipId],
          axis,
          headLocation: {
            row: hoveredCell.row,
            column: hoveredCell.column
          },
          dropped: true
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
          column: hoveredCell.column
        },
        orientation: shipOrientation
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
        headLocation: {
          row: -1,
          column: -1
        },
        dropped: false
      }
    }))
  }

  const resetCell = (id: number) => {
    setPlayerField(
      field.map((cell) => {
        return (cell as any).shipId === id
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

  const changeOrientation = (orientation: string) => {
    setAxis(orientation as 'x' | 'y')

    setPlayerShips((ships) => {
      const updatedShips = { ...ships }
      Object.values(updatedShips).forEach((ship) => {
        const extendedShip = ship as Ship
        if (!extendedShip.dropped) {
          updatedShips[ship.id] = {
            ...ship,
            orientation:
              orientation === 'x'
                ? Orientation.Horizontal
                : Orientation.Vertical
          }
        }
      })
      return updatedShips
    })
  }

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-center justify-center gap-4">
        <button
          className={`${
            axis === 'x' ? 'bg-neutral-100 text-neutral-900' : ''
          } inline-block rounded-md border border-neutral-100 px-8 py-2.5 text-xs font-medium transition hover:scale-105 sm:text-base md:px-12`}
          onClick={() => changeOrientation('x')}
        >
          X axis
        </button>
        <button
          className={`${
            axis === 'y' ? 'bg-neutral-100 text-neutral-900' : ''
          } inline-block rounded-md border border-neutral-100 px-8 py-2.5 text-xs font-medium transition hover:scale-105 sm:text-base md:px-12`}
          onClick={() => changeOrientation('y')}
        >
          Y axis
        </button>
      </div>

      <div className="flex flex-col gap-4">
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

          <div className="flex flex-wrap justify-center gap-1 md:grid md:grid-cols-2">
            {Object.entries(playerShips).map(([id, ship]) => (
              <DraggableShip
                key={id}
                id={Number(id)}
                ship={ship}
                resetShipPlacement={resetShipPlacement}
                setShipBeingRemovedId={setShipBeingRemovedId}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  )
}
