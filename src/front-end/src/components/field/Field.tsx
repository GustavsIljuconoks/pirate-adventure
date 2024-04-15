import { useEffect } from 'react'
import { CellType } from 'types/Square'
import { CellDto, GameFieldDto, ShipDto } from 'types/webapi'
import Cell from './Cell'
import FieldShip from './FieldShip'
import FieldWrapper from './FieldWrapper'

type Props = {
  player?: string
  field: GameFieldDto
  ships: ShipDto[]
  attackPlayer: (player: string, cellColumn: number, cellRow: number) => void
  movesBlocked: boolean
}

const Field = ({ player, field, ships, attackPlayer, movesBlocked }: Props) => {
  useEffect(() => {
    console.log('Field component re-rendered with props:', field)
  }, [])

  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  const playerCells: { [key: string]: CellType[] } = {}
  if (field) {
    Object.keys(field.cells).forEach((rowIndex) => {
      playerCells[rowIndex] = field?.cells[rowIndex].map(
        (cell: CellDto, columnIndex) => ({
          ...cell,
          isHit: false,
          column: columns[columnIndex],
          row: rowIndex
        })
      )
    })
  }

  const safeAttackPlayer =
    attackPlayer ??
    ((player: string, cellRow: number, cellColumn: number) => {})

  return (
    <FieldWrapper>
      <div className="relative grid aspect-square grid-cols-[repeat(10,minmax(0,56px))]">
        {field &&
          Object.values(playerCells).flatMap((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <Cell
                key={`${rowIndex}-${columnIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                data={cell}
                attackPlayer={safeAttackPlayer}
                movesBlocked={movesBlocked}
              />
            ))
          )}

        {ships &&
          Object.values(ships).map((ship, id) => {
            if (
              player === 'person' ||
              (player === 'computer' && ship.isDestroyed)
            )
              return (
                <FieldShip
                  key={id}
                  ship={ship}
                  // belongsTo={player === 'person' ? 'player' : 'enemy'}
                />
              )
          })}
      </div>
    </FieldWrapper>
  )
}

export default Field
