import { useEffect, useState, type ReactElement } from 'react'

import CopyToClipboard from '@components/input/CopyToClipboard'
import Layout from '@components/Layout/Layout'
import LobbyAvatar from '@components/LobbyAvatar'
import SettingsMenu from '@components/SettingsMenu'

import GameBoard from '@components/field/Board'
import style from '@styles/lobby/Lobby.module.css'

import axios from 'axios'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setGameStateData } from 'reducers/gameStatusSlice'
import { resetShipsForPlayer } from 'reducers/shipSaveSlice'
import { RootState } from 'store'
import { GameState, PlayerState } from 'types/webapi'
import { findLinkByRel } from 'utils/findLinkByRel'
import { getGameStatus } from 'utils/gameStatusRequest'
import { useWhoAmI } from 'utils/whoAmI'
import { APP_URL, SERVER_URL } from '../constants'

export default function Lobby(): ReactElement {
  const [player1Ready, setPlayer1Ready] = useState(false)
  const [player2Ready, setPlayer2Ready] = useState(false)
  const apiData = useSelector((state: RootState) => state.apiData.data)
  const gameId = apiData.id
  const joinGameLink = APP_URL + 'join/' + gameId

  const player1InitializeField = findLinkByRel(apiData, 'player1InitField')
  const player2InitializeField = findLinkByRel(apiData, 'player2InitField')
  const player1NotReady = findLinkByRel(apiData, 'player1Unready')
  const player2NotReady = findLinkByRel(apiData, 'player2Unready')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { whoAmI } = useWhoAmI()

  const gamePlayer1 = useSelector((state: RootState) => state.game.player1)
  const gamePlayer2 = useSelector((state: RootState) => state.game.player2)

  const shipsPlayer1 = useSelector(
    (state: RootState) => state.shipSave.player1Ships
  )
  const shipsPlayer2 = useSelector(
    (state: RootState) => state.shipSave.player2Ships
  )

  const gameStateLink = useSelector((state: RootState) => state.apiData.link)
  const gamePlayers = useSelector(
    (state: RootState) => state.updatePlayers.players
  )

  const playerReady = gamePlayer1 ? player1Ready : player2Ready
  const setPlayerReady = gamePlayer1 ? setPlayer1Ready : setPlayer2Ready

  useEffect(() => {
    localStorage.removeItem('intendedDestinationUrl')

    if (gamePlayer1) {
      dispatch(resetShipsForPlayer({ playerId: 1 }))
    }

    if (gamePlayer2) {
      dispatch(resetShipsForPlayer({ playerId: 2 }))
    }
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      getGameStatus(gameStateLink)
        .then((data) => {
          dispatch(setGameStateData(data))

          // Set player ready status
          if (data.player1.state == PlayerState.Ready) {
            setPlayer1Ready(true)
          }
          if (data.player2.state == PlayerState.Ready) {
            setPlayer2Ready(true)
          }

          if (data.state == GameState.Started) {
            navigate(`/game/${gameId}`)
          }
        })
        .catch((error) => {
          console.error('An error occurred:', error)
        })
      whoAmI()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const initializeField = () => {
    if (gamePlayer1) {
      axios.post(SERVER_URL + player1InitializeField, {
        ships: shipsPlayer1
      })
    }

    if (gamePlayer2) {
      axios.post(SERVER_URL + player2InitializeField, {
        ships: shipsPlayer2
      })
    }
  }

  const playerNotReady = () => {
    if (gamePlayer1) {
      axios.post(SERVER_URL + player1NotReady)
    }

    if (gamePlayer2) {
      axios.post(SERVER_URL + player2NotReady)
    }
  }

  const handleButtonClick = () => {
    setPlayerReady(!playerReady)

    if (playerReady) {
      playerNotReady()
    } else {
      initializeField()
    }
  }

  return (
    <Layout>
      <div className="mx-auto">
        <div className={style['lobby-code']}>
          <Link to="/" className="absolute left-8 top-10 font-medium text-2xl">
            <div className="flex flex-row gap-4 items-center">
              <div className="w-[40px] h-[40px]">
                <img src="/icons/arrow-left.svg" alt="arrow" />
              </div>
              Back to home
            </div>
          </Link>
          <CopyToClipboard joinLink={joinGameLink} />
          <SettingsMenu />
        </div>

        <div className="setup mb-16">
          <h1 className="text-3xl font-bold text-center mb-10">Your Fleet</h1>

          <div className="flex flex-row mb-8 gap-4">
            <GameBoard />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className={classNames(
                'w-9/12 p-4 rounded-lg font-medium align-middle',
                {
                  [style.disabled]:
                    shipsPlayer1.length !== 5 || shipsPlayer2.length !== 5,
                  [style.enabled]:
                    shipsPlayer1.length === 5 || shipsPlayer2.length === 5
                }
              )}
              onClick={handleButtonClick}
              disabled={
                shipsPlayer1.length || shipsPlayer2.length == 5 ? false : true
              }
            >
              {!playerReady ? 'Ready to fight' : 'Loading... '}
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <LobbyAvatar
            username={gamePlayers?.me.name}
            isReady={gamePlayer1 ? player1Ready : player2Ready}
            avatarIcon="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/celebrity-captain-jack-sparrow-pirate-carribean-512.png"
          />
          <LobbyAvatar
            username={gamePlayers?.enemy.name}
            isReady={gamePlayer1 ? player2Ready : player1Ready}
            avatarIcon="https://img.freepik.com/premium-vector/head-pirate-with-hat-eye-patch-flat-vector-illustration_124715-1485.jpg"
          />
        </div>
      </div>
    </Layout>
  )
}
