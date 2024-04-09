import Field from 'components/field/Field'
import Layout from 'components/layout/Layout'
import { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { FieldType } from 'types/Square'
import { GameDto, ShipDto } from 'types/webapi'
import { createField } from 'utils/creators/createGrid'
import { createShips } from 'utils/creators/createShips'
import { getGameStatus } from 'utils/gameStatusRequest'
import { useWhoAmI } from 'utils/whoAmI'

export default function Game(): ReactElement {
  const [playerField, setPlayerField] = useState(createField())
  const [computerField, setComputerField] = useState(createField())

  const [playerShips1, setPlayerShips1] = useState<ShipDto[]>()
  const [playerShips2, setPlayerShips2] = useState<ShipDto[]>()

  const [computerShips, setComputerShips] = useState(createShips())
  const [playerShips, setPlayerShips] = useState(createShips())

  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameStatusData, setGameStatusData] = useState<GameDto>()
  const [showInfo, setShowInfo] = useState(false)
  const [players, setPlayers] = useState({ me: '', enemy: '' })
  const { whoAmI } = useWhoAmI()

  const gameStateLink = useSelector((state: RootState) => state.apiData.link)

  useEffect(() => {
    getGameStatus(gameStateLink)
      .then((data) => {
        setGameStatusData(data)
        setPlayerShips1(data.player1.ships)
        setPlayerShips2(data.player2.ships)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })

    whoAmI(setPlayers)
  }, [])

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

  const debugGameState = () => {
    getGameStatus(gameStateLink)
      .then((data) => {
        setGameStatusData(data)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })

    setShowInfo(!showInfo)
  }

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <div className="profile font-bold">
          <h1 className="text-3xl">{players.me}</h1>
          <div className="time">time</div>
        </div>

        <div className="profile font-bold">
          <h1 className="text-3xl">{players.enemy}</h1>
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
              ships={playerShips1}
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

      <div className="game-state">
        <button
          className="mt-5 border-gray-700 rounded"
          onClick={debugGameState}
        >
          Show game state
        </button>

        {showInfo &&
          gameStatusData.map((game, index) => (
            <div key={index}>
              <p>ID: {game.id}</p>
              <p>Column Size: {game.columnSize}</p>
              <p>Row Size: {game.rowSize}</p>
              <p>Player 1: {game.player1.id}</p>
              <p>Player 2: {game.player2.id}</p>
              <p>State: {game.state.value}</p>
              <p>Next Move: {game.nextMove}</p>
            </div>
          ))}
      </div>
    </Layout>
  )
}
