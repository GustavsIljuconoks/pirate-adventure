import classNames from 'classnames'
import { motion } from 'framer-motion'
import style from 'styles/field/Ship.module.css'
import { Orientation, ShipDto } from 'types/webapi'

type Props = {
  ship: ShipDto
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
          <div className={classNames(`flex flex-row`, statusClass)}>
            {Array.from({ length: ship.size }).map((_, index) => (
              <div className={style['ship-field']} key={index}>
                {index + 1}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  } else {
    return null
  }
}

export default FieldShip
