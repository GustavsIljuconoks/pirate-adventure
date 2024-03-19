import { useDroppable } from '@dnd-kit/core'
import style from 'styles/field/Square.module.css'
import { Ships } from 'types/Ship'
import { CellType } from 'types/Square'
import { isPositionValid } from 'utils/validators/isPositionValid'

type Props = {
  field: CellType
  cellId: number
  data: CellType
  draggedShipId?: number
  hoveredCellId?: number
  axis: string
  ships: Ships
}

const DroppableSquare = ({
  field,
  cellId,
  data,
  draggedShipId,
  hoveredCellId,
  axis,
  ships
}: Props) => {
  const { setNodeRef } = useDroppable({
    id: cellId,
    data: {
      column: data.column,
      row: data.row
    }
  })

  const getCellStatus = () => {
    // speficially checks for undefined because id can be 0
    if (hoveredCellId === undefined || !draggedShipId) return

    const shipLength = ships[draggedShipId].length

    let isPartOfShip = false

    for (let i = 0; i < shipLength; i++) {
      if (
        (axis === 'x' && cellId === hoveredCellId + i) ||
        (axis === 'y' && cellId === hoveredCellId + i * 10)
      ) {
        isPartOfShip = true
        break
      }
    }

    if (isPartOfShip && isPositionValid(field, hoveredCellId, shipLength, axis))
      return 'valid'

    if (isPartOfShip) return 'error'
  }

  const status = getCellStatus()

  return (
    <div
      className={`${status === 'valid' ? 'bg-cyan-800' : ''}
      ${status === 'error' ? 'bg-red-800' : ''} ${style.square}`}
      ref={setNodeRef}
    ></div>
  )
}

export default DroppableSquare
