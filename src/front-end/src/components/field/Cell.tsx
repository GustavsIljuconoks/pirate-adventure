import style from '@styles/field/Square.module.css'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { CellType } from 'types/Square'
import { CellState } from 'types/webapi'

type Props = {
  rowIndex: number
  columnIndex: number
  data: CellType
  attackPlayer: (player: string, cellColumn: number, cellRow: number) => void
}

const Cell = ({ rowIndex, columnIndex, data, attackPlayer }: Props) => {
  const gamePlayers = useSelector(
    (state: RootState) => state.updatePlayers.players
  )

  const gameStatusData = useSelector(
    (state: RootState) => state.gameStatusData.data
  )

  const allowClick =
    gameStatusData.nextMove === gamePlayers.me.id &&
    data.state !== CellState.Missed &&
    data.state !== CellState.Hit

  const cellColor = data.state === CellState.Hit ? 'bg-red-500' : 'bg-white'

  const handleClick = () => {
    attackPlayer(gamePlayers.enemy.name, columnIndex, rowIndex)
  }

  return (
    <div
      className={classNames(
        style.square,
        `relative flex aspect-square`,
        `${allowClick ? 'hover:cursor-crosshair hover:shadow-cell-hover' : ''}`
      )}
      onClick={allowClick ? handleClick : undefined}
    >
      {(data.state === CellState.Missed || data.state === CellState.Hit) && (
        <>
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
