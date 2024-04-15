import classNames from 'classnames'
import style from 'styles/field/Ship.module.css'
import { ShipDto } from 'types/webapi'

interface Props {
  ships: ShipDto[]
}

const ShipList = ({ ships }: Props) => {
  return (
    <div className="mt-6 hidden justify-center gap-3 md:grid md:grid-cols-2">
      {ships &&
        Object.values(ships).map((ship, id) => (
          <div
            key={id}
            className={classNames(
              'block',
              ship.isDestroyed ? 'opacity-30' : ''
            )}
          >
            <div className="flex flex-row">
              {Array.from({ length: ship.size }).map((_, index) => (
                <div className={style.ship} key={index}>
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ShipList
