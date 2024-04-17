import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { useState } from 'react'
import style from 'styles/field/Ship.module.css'
import { ShipDto } from 'types/webapi'

type Props = {
  id: number
  ship: ShipDto
  resetShipPlacement: (id: number) => void
  setShipBeingRemovedId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >
}

const DraggableShip = ({
  id,
  ship,
  resetShipPlacement,
  setShipBeingRemovedId
}: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  })
  const styleTransform = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        touchAction: 'none'
      }
    : undefined

  const [shipLength, setShipLength] = useState<number>(ship.size)

  if (ship.headLocation.column !== -1 && ship.headLocation.row !== -1)
    return (
      <motion.button
        key="trash"
        className={style.trash}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          setShipBeingRemovedId(undefined)
          resetShipPlacement(id)
        }}
        onMouseOver={() => setShipBeingRemovedId(id)}
        onMouseOut={() => setShipBeingRemovedId(undefined)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-7 w-7 sm:h-10 sm:w-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>

        <p className="text-xs capitalize sm:text-base">
          {ship.name} ({ship.size})
        </p>
      </motion.button>
    )

  return (
    <motion.button key="ship" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        className={style['ship-draggable']}
        style={styleTransform}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <p className="text-xs capitalize sm:text-base">
          {ship.name} ({ship.size})
        </p>

        <div className="flex flex-row">
          {Array.from({ length: shipLength }).map((_, index) => (
            <div className={style.ship} key={index}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

export default DraggableShip
