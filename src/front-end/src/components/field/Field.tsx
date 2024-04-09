import { GameFieldDto, ShipDto } from 'types/webapi'
import Cell from './Cell'
import FieldShip from './FieldShip'
import FieldWrapper from './FieldWrapper'

type Props = {
  player?: string
  field: GameFieldDto
  ships: ShipDto[]
  attackPlayer: (player: string, position: number) => void
  movesBlocked: boolean
}

const Field = ({ player, field, ships, attackPlayer, movesBlocked }: Props) => {
  const safeAttackPlayer =
    attackPlayer ?? ((player: string, position: number) => {})

  return (
    <FieldWrapper>
      <div className="relative grid aspect-square grid-cols-[repeat(10,minmax(0,56px))]">
        {field &&
          Object.values(field.cells).map((row, rowIndex) => (
            <div key={rowIndex} className="column">
              {row.map((cell, cellIndex) => (
                <Cell
                  key={cellIndex}
                  cellId={cellIndex}
                  data={cell}
                  attackPlayer={safeAttackPlayer}
                  movesBlocked={movesBlocked}
                />
              ))}
            </div>
          ))}

        {ships &&
          Object.values(ships).map((ship, id) => {
            if (
              player === 'person' ||
              (player === 'computer' && ship.hitCount == 0)
            )
              return (
                <FieldShip
                  key={id}
                  ship={ship}
                  belongsTo={player === 'person' ? 'player' : 'enemy'}
                />
              )
          })}
      </div>
    </FieldWrapper>
  )
}

export default Field
