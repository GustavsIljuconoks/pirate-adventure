import { Ships } from 'types/Ship'
import { FieldType } from 'types/Square'
import Cell from './Cell'
import FieldShip from './FieldShip'
import FieldWrapper from './FieldWrapper'

type Props = {
  player?: string
  field: FieldType
  ships: Ships
  attackPlayer: (player: string, position: number) => void
  movesBlocked: boolean
}

const Field = ({ player, field, ships, attackPlayer, movesBlocked }: Props) => {
  const safeAttackPlayer =
    attackPlayer ?? ((player: string, position: number) => {})

  return (
    <FieldWrapper>
      <div className="relative grid aspect-square grid-cols-[repeat(10,minmax(0,56px))]">
        {field.map((data, id) => (
          <Cell
            key={id}
            cellId={id}
            data={data}
            attackPlayer={safeAttackPlayer}
            movesBlocked={movesBlocked}
          />
        ))}
        {Object.entries(ships).map(([id, ship]) => {
          if (
            player === 'person' ||
            (player === 'computer' && ship.isDestroyed)
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
