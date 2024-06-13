import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Ship } from 'types/Ship'

interface Props {
  ships: Ship[]
}

const ShipList = ({ ships }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  const baseWidth = windowWidth > 1536 ? 35 : 25
  const baseHeight = windowWidth > 1536 ? 40 : 30

  return (
    <div className="mt-6 hidden justify-center gap-3 md:grid md:grid-cols-2">
      {ships &&
        Object.values(ships).map((ship, id) => (
          <div
            key={id}
            className={classNames(
              'block',
              ship.isDestroyed ? 'opacity-50' : ''
            )}
          >
            <div className="flex flex-row">
              <img
                key={id}
                src={`/icons/ships/${ship.image}`}
                alt={ship.name}
                className={ship.isDestroyed ? 'opacity-30' : ''}
                style={{
                  width: `${baseWidth * ship.size + 5}px`,
                  height:
                    ship.name === 'Patrol Boat' ? baseHeight * 0.55 : baseHeight
                }}
              />
            </div>
          </div>
        ))}
    </div>
  )
}

export default ShipList
