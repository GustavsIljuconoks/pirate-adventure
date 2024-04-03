import Field from 'components/field/Field'
import Layout from 'components/layout/Layout'
import { ReactElement, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { FieldType } from 'types/Square'
import { createField } from 'utils/creators/createGrid'
import { createShips } from 'utils/creators/createShips'

export default function Game(): ReactElement {
  const [playerField, setPlayerField] = useState(createField())
  const [computerField, setComputerField] = useState<FieldType>(createField())

  const [playerShips, setPlayerShips] = useState(createShips())
  const [computerShips, setComputerShips] = useState(createShips())
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  const gamePlayer1 = useSelector((state: RootState) => state.game.player1)
  const gamePlayer2 = useSelector((state: RootState) => state.game.player2)

  const attackPlayer = (playerToAttack: string, position: number) => {
    // hit cell
    const fieldCopy: FieldType = JSON.parse(
      JSON.stringify(
        playerToAttack === 'computer' ? computerField : playerField
      )
    )
    const cell = fieldCopy[position]
    if (cell === undefined) {
      setIsPlayerTurn((value) => !value)
      return
    }

    cell.isHit = true

    // update field
    if (playerToAttack === 'computer') {
      setComputerField(fieldCopy)
    } else {
      setPlayerField(fieldCopy)
    }
  }

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <div className="profile font-bold">
          <h1 className="text-3xl">{gamePlayer1?.player1}</h1>
          <div className="time">time</div>
        </div>

        <div className="profile font-bold">
          <h1 className="text-3xl">{gamePlayer2?.player2}</h1>
          <div className="time">time</div>
        </div>
      </div>

      <div className="flex flex-row justify-around">
        <div className="flex flex-col gap-3 sm:gap-6">
          <h2 className="font-bold uppercase text-cyan-300 sm:text-2xl">
            Friendly waters
          </h2>
          <div className="flex flex-col">
            <Field
              player="person"
              field={playerField}
              ships={playerShips}
              attackPlayer={attackPlayer}
              movesBlocked={true}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6">
          <h2 className="font-bold uppercase text-orange-400 sm:text-2xl">
            Enemy waters
          </h2>
          <div className="flex flex-col">
            <Field
              player="computer"
              field={computerField}
              ships={computerShips}
              attackPlayer={attackPlayer}
              movesBlocked={!isPlayerTurn}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
