import axios from 'axios'
import Field from 'components/field/Field'
import Layout from 'components/layout/Layout'
import { SERVER_URL } from 'constants'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGameStateData } from 'reducers/gameStatusSlice'
import { RootState } from 'store'
import { CellState, GameDto, GameFieldDto, ShipDto } from 'types/webapi'
import { createField } from 'utils/creators/createGrid'
import { createShips } from 'utils/creators/createShips'
import { getGameStatus } from 'utils/gameStatusRequest'
import { getCell } from 'utils/getCell'
import { useWhoAmI } from 'utils/whoAmI'

export default function Game(): ReactElement {
  const [playerField, setPlayerField] = useState(createField())
  const [computerField, setComputerField] = useState(createField())

  const [playerShips1, setPlayerShips1] = useState<ShipDto[]>()
  const [playerShips2, setPlayerShips2] = useState<ShipDto[]>()

  const [playerField1, setPlayerField1] = useState<GameFieldDto>()
  const [playerField2, setPlayerField2] = useState<GameFieldDto>()

  const [computerShips, setComputerShips] = useState(createShips())
  const [playerShips, setPlayerShips] = useState(createShips())

  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameStatusData, setGameStatusData] = useState<GameDto>()
  const [players, setPlayers] = useState({ me: '', enemy: '' })
  const { whoAmI } = useWhoAmI()
  const dispatch = useDispatch()

  const gameStateLink = useSelector((state: RootState) => state.apiData.link)
  const apiData = useSelector((state: RootState) => state.apiData.data)
  const gamePlayers = useSelector(
    (state: RootState) => state.updatePlayers.players
  )
  const gameData = useSelector((state: RootState) => state.gameStatusData.data)

  useEffect(() => {
    const interval = setInterval(() => {
      getGameStatus(gameStateLink)
        .then((data) => {
          setGameStatusData(data)
          dispatch(setGameStateData(data))
          setPlayerShips1(data.player1.ships)
          setPlayerShips2(data.player2.ships)
          setPlayerField1(data.player1.field)
          setPlayerField2(data.player2.field)
        })
        .catch((error) => {
          console.error('An error occurred:', error)
        })

      whoAmI()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const attackPlayer = (
    playerToAttack: string,
    cellColumn: number,
    cellRow: number
  ) => {
    console.log('column ' + cellRow)
    console.log('row ' + cellColumn)
    console.log(gameData.nextMove)
    console.log(gamePlayers.me.id)

    const fieldCopy: GameFieldDto = JSON.parse(
      JSON.stringify(
        playerToAttack === gamePlayers.enemy.name
          ? gamePlayers.enemy.field
          : gamePlayers.me.field
      )
    )

    // TODO: check if cell is occupied
    const cell = getCell(fieldCopy, cellRow, cellColumn)
    console.log(fieldCopy)

    console.log(cellColumn)
    console.log(cellRow)

    if (cell) {
      axios
        .post(
          SERVER_URL + `/game/${apiData.id}/player${gameData.nextMove}/shoot`,
          {
            row: cellColumn,
            column: cellRow
          }
        )
        .then((data) => {
          if (cell?.state === CellState.Occupied) {
            cell.state = CellState.Hit
            console.log('hitted')
          } else {
            cell.state = CellState.Missed
            console.log('missed')
          }

          cell.isHit = true
          getGameStatus(gameStateLink).then((data) => {
            dispatch(setGameStateData(data))
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // update field
    if (playerToAttack === gamePlayers.enemy.name) {
      if (gamePlayers.enemy.id === 2) {
        setPlayerField2(fieldCopy)
      } else {
        setPlayerField1(fieldCopy)
      }
    } else {
      setPlayerField1(fieldCopy)
    }
  }

  const debugGameState = () => {
    getGameStatus(gameStateLink)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  return (
    <Layout>
      <div className="flex flex-row justify-between">
        <div className="profile font-bold">
          <h1 className="text-3xl">{gamePlayers.me.name}</h1>
          <div className="time">time</div>
        </div>

        <div className="profile font-bold">
          <h1 className="text-3xl">{gamePlayers.enemy.name}</h1>
          <div className="time">time</div>
        </div>
      </div>

      <div className="flex flex-row justify-around">
        <div className="flex flex-col gap-3 sm:gap-6">
          <h2 className="font-bold uppercase sm:text-2xl">Friendly waters</h2>
          <div className="flex flex-col">
            <Field
              player="person"
              field={
                gamePlayers.me.name === gameStatusData?.player1.id
                  ? playerField1
                  : playerField2
              }
              ships={
                gamePlayers.me.name === gameStatusData?.player1.id
                  ? playerShips1
                  : playerShips2
              }
              attackPlayer={attackPlayer}
              movesBlocked={true}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6">
          <h2 className="font-bold uppercase sm:text-2xl">Enemy waters</h2>
          <div className="flex flex-col">
            <Field
              player="computer"
              field={
                gamePlayers.enemy.name === gameStatusData?.player1.id
                  ? playerField1
                  : playerField2
              }
              ships={
                gamePlayers.enemy.name === gameStatusData?.player1.id
                  ? playerShips1
                  : playerShips2
              }
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
      </div>
    </Layout>
  )
}
