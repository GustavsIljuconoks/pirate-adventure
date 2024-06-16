import { motion } from 'framer-motion'
import { Ship } from 'types/Ship'
import { Orientation } from 'types/webapi'

type Props = {
  ship: Ship
  removeButtonHovered?: boolean
  belongsTo?: 'player' | 'enemy'
}

const FieldShip = ({ ship, removeButtonHovered, belongsTo }: Props) => {
  if (ship.headLocation.column === null && ship.headLocation.row === null)
    return <></>

  const width = `${ship.size * 10}%`
  const height = '10%'

  const left = `${
    ship.headLocation.column * 10 +
    (ship.orientation === Orientation.Horizontal ? 0 : 10)
  }%`
  const top = `${ship.headLocation.row * 10}%`
  const transform =
    ship.orientation === Orientation.Horizontal || ship.orientation === 0
      ? 'rotate(0deg)'
      : 'rotate(90deg)'

  let statusClass
  if (removeButtonHovered) {
    statusClass = 'ship-danger'
  } else if (belongsTo === 'player') {
    statusClass = 'ship-friendly'
  } else if (belongsTo === 'enemy') {
    statusClass = 'ship-enemy'
  }

  if (ship.headLocation.column !== -1 && ship.headLocation.row !== -1) {
    return (
      <div
        className="absolute flex origin-top-left select-none items-center justify-center"
        style={{
          width,
          height,
          left,
          top,
          transform
        }}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <img
            src={`/icons/ships/${ship.image}`}
            alt={ship.name}
            className={`${ship.size === 1 ? 'h-[40%]' : 'h-[80%]'}
          ${statusClass} w-[80%]`}
            draggable="false"
          />
        </motion.div>
      </div>
    )
  } else {
    return null
  }
}

export default FieldShip
