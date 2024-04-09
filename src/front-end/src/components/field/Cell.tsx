import classNames from 'classnames'
import { motion } from 'framer-motion'
import style from 'styles/field/Square.module.css'
import { CellDto, CellState } from 'types/webapi'

type Props = {
  cellId: number
  data: CellDto
  attackPlayer: (player: string, position: number) => void
  movesBlocked: boolean
}

const Cell = ({ cellId, data, attackPlayer, movesBlocked }: Props) => {
  const allowClick = data.state === CellState.Hit || movesBlocked
  const cellColor =
    data.state === CellState.Occupied ? 'bg-red-500' : 'bg-white'

  const handleClick = () => {
    if (allowClick) return
    attackPlayer('computer', cellId)
  }

  return (
    <div
      className={classNames(
        style.square,
        `relative flex aspect-square`,
        `${allowClick ? '' : 'hover:cursor-crosshair hover:shadow-cell-hover'}`
      )}
      onClick={handleClick}
    >
      {data.state === CellState.Hit && (
        <>
          <p>hit</p>
          <motion.div
            className={`${cellColor} absolute h-1/4 w-1/4 rounded-full opacity-40`}
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 6, 0],
              transition: {
                duration: 0.5,
                ease: 'easeInOut',
                times: [0, 0.2, 1]
              }
            }}
          ></motion.div>
          <motion.div
            className={`${cellColor} z-30 h-1/4 w-1/4 rounded-full`}
            initial={{
              opacity: 0.8,
              x: -100,
              y: -100,
              width: '100%',
              rotate: 45
            }}
            animate={{ opacity: 1, x: 0, y: 0, width: '25%' }}
            transition={{
              type: 'spring',
              mass: 0.1,
              damping: 20,
              stiffness: 500
            }}
          ></motion.div>
        </>
      )}
    </div>
  )
}

export default Cell
