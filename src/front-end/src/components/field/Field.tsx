import { FieldType } from 'types/Square'
import { ShipDto } from 'types/webapi'
import Cell from './Cell'
import FieldShip from './FieldShip'
import FieldWrapper from './FieldWrapper'

type Props = {
  player?: string
  field: FieldType
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
        {field.map((data, id) => (
          <Cell
            key={id}
            cellId={id}
            data={data}
            attackPlayer={safeAttackPlayer}
            movesBlocked={movesBlocked}
          />
        ))}
        {ships &&
          Object.values(ships).map((ship, id) => {
            if (player === 'person' || player === 'computer')
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
