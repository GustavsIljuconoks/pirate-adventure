import Layout from '@components/Layout/Layout'
import LoadingOrError from '@components/LoadingOrError'
import Spinner from '@components/Spinner'
import Field from '@components/field/Field'
import ShipList from '@components/field/ShipList'
import axios from 'axios'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setGameStateData } from 'reducers/gameStatusSlice'
import { RootState } from 'store'
import {
  CellState,
  GameDto,
  GameFieldDto,
  GameState,
  Scoring,
  ShipDto
} from 'types/webapi'
import { getGameStatus } from 'utils/gameStatusRequest'
import { getCell } from 'utils/getCell'
import { useWhoAmI } from 'utils/whoAmI'
import hitSound from '../../public/sounds/hit.mp3?url'
import missedSound from '../../public/sounds/missed.mp3?url'
import gameMusic from '../../public/sounds/sea.mp3?url'
import { SERVER_URL } from '../constants'

export default function Game(): ReactElement {
  const [playerShips1, setPlayerShips1] = useState<ShipDto[]>()
  const [playerShips2, setPlayerShips2] = useState<ShipDto[]>()
  const [playerField1, setPlayerField1] = useState<GameFieldDto>()
  const [playerField2, setPlayerField2] = useState<GameFieldDto>()

  const [gameStatusData, setGameStatusData] = useState<GameDto>()
  const [isLoading, setIsLoading] = useState(true)

  const musicRef = useRef(new Audio(gameMusic))
  const soundHitRef = useRef(new Audio(hitSound))
  const soundMissedRef = useRef(new Audio(missedSound))

  const { whoAmI } = useWhoAmI()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const gameStateLink = useSelector((state: RootState) => state.apiData.link)
  const apiData = useSelector((state: RootState) => state.apiData.data)
  const gamePlayers = useSelector(
    (state: RootState) => state.updatePlayers.players
  )
  const gameData = useSelector((state: RootState) => state.gameStatusData.data)
  const userMusic = useSelector((state: RootState) => state.soundSave.music)
  const userSound = useSelector((state: RootState) => state.soundSave.sound)

  useEffect(() => {
    if (userMusic) {
      musicRef.current.volume = 0.1
      musicRef.current.play()
    }

    return () => {
      musicRef.current.pause()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await getGameStatus(gameStateLink)
      const data = response

      if (data?.state === GameState.Finished) {
        clearInterval(interval)
        navigate(`/game-over/${apiData.id}`)
      }
      setGameStatusData(data)
      dispatch(setGameStateData(data))
      setPlayerShips1(data.player1.ships)
      setPlayerShips2(data.player2.ships)
      setPlayerField1(data.player1.field)
      setPlayerField2(data.player2.field)
      setIsLoading(false)

      whoAmI()
    }, 1000)
    return () => clearInterval(interval)
  }, []) // gameStateLink, apiData.id, navigate

  const attackPlayer = (
    playerToAttack: string,
    cellColumn: number,
    cellRow: number
  ) => {
    const fieldCopy: GameFieldDto = JSON.parse(
      JSON.stringify(
        playerToAttack === gamePlayers.enemy.name
          ? gamePlayers.enemy.field
          : gamePlayers.me.field
      )
    )

    const cell = getCell(fieldCopy, cellRow, cellColumn)
    if (cell) {
      axios
        .post(
          SERVER_URL + `/game/${apiData.id}/player${gameData.nextMove}/shoot`,
          {
            row: cellRow,
            column: cellColumn
          }
        )
        .then((response) => {
          if (response.data.scoring === Scoring.Hit) {
            cell.state = CellState.Hit

            if (userSound) {
              soundHitRef.current.play()
            }
          }
          if (response.data.scoring === Scoring.Missed) {
            cell.state = CellState.Missed

            if (userSound) {
              soundMissedRef.current.play()
            }
          }

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

  return (
    <Layout>
      <Link to="/" className="font-medium text-2xl mb-12">
        <div className="flex flex-row gap-4 items-center">
          <div className="w-[40px] h-[40px]">
            <img src="/icons/arrow-left.svg" alt="arrow" />
          </div>
          Back to home
        </div>
      </Link>
      <div className="flex flex-row justify-between mb-6">
        <div className="profile flex flex-row-reverse items-end gap-4">
          <Spinner
            show={gamePlayers.me.id === gameStatusData?.nextMove ? true : false}
          />
          <div className="font-bold">
            <h1 className="text-3xl">{gamePlayers.me.name}</h1>
            <div className="time">time</div>
          </div>
        </div>

        <div className="profile flex flex-row items-end gap-4">
          <Spinner
            show={
              gamePlayers.enemy.id === gameStatusData?.nextMove ? true : false
            }
          />
          <div className="font-bold">
            <h1 className="text-3xl">{gamePlayers.enemy.name}</h1>
            <div className="time">time</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-around">
        <div className="flex flex-col gap-3 sm:gap-6">
          <h2 className="font-bold uppercase sm:text-2xl">Friendly waters</h2>
          <div className="flex flex-col gap-8">
            {isLoading ? (
              <LoadingOrError />
            ) : (
              <>
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
                />

                <ShipList
                  ships={
                    gamePlayers.me.name === gameStatusData?.player1.id
                      ? playerShips1
                      : playerShips2
                  }
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-6">
          <h2 className="font-bold uppercase sm:text-2xl">Enemy waters</h2>
          <div className="flex flex-col gap-8">
            {isLoading ? (
              <LoadingOrError />
            ) : (
              <>
                <Field
                  player="enemy"
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
                />

                <ShipList
                  ships={
                    gamePlayers.enemy.name === gameStatusData?.player1.id
                      ? playerShips1
                      : playerShips2
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
