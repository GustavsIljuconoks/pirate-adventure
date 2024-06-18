import Layout from '@components/Layout/Layout'
import axios from 'axios'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setApiData, setGameState } from 'reducers/apiDataSlice'
import { setPlayer1, setPlayer2 } from 'reducers/gameSlice'
import { RootState } from 'store'
import {
  GameDto,
  GameState,
  PlayerGamesResponseDto,
  Status
} from 'types/webapi'
import { findLinkByRel } from 'utils/findLinkByRel'
import { replaceGameId } from 'utils/replaceGameId'
import { SERVER_URL } from '../constants'

export default function History(): ReactElement {
  const player = useSelector((state: RootState) => state.userSave.name)
  const [games, setGames] = useState<PlayerGamesResponseDto[]>()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const apiData = useSelector((state: RootState) => state.apiData.data)
  const gameLink = useSelector((state: RootState) => state.apiData.link)
  const userName = useSelector((state: RootState) => state.userSave.name)

  useEffect(() => {
    axios
      .get(SERVER_URL + '/history', {
        params: {
          playerName: player
        }
      })
      .then((response) => {
        const gamesWithFormattedDate = response.data.map(
          (game: PlayerGamesResponseDto) => {
            const date = new Date(game.date)
            const formattedDate = `${date
              .getDate()
              .toString()
              .padStart(2, '0')}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${date.getFullYear().toString().slice(-2)}`

            return { ...game, date: formattedDate }
          }
        )

        setGames(gamesWithFormattedDate)
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  }, [])

  const handleJoinGame = (gameId: string): void => {
    const resumeGameLink = findLinkByRel(apiData, 'resumeGame')
    const resumeLink = replaceGameId(resumeGameLink, gameId)

    axios
      .post(SERVER_URL + resumeLink, {
        player1: userName
      })
      .then((response) => {
        const game: GameDto = response.data
        const gameStatusLink = replaceGameId(gameLink, game.id)

        dispatch(setGameState(gameStatusLink))
        dispatch(setApiData(response.data))

        if (userName === game.player1.id) {
          dispatch(setPlayer1({ player1: userName, id: game.id }))
        }

        if (userName === game.player2.id) {
          dispatch(setPlayer2({ player2: userName, id: game.id }))
        }

        if (game.state === GameState.Lobby) {
          navigate(`/lobby/${game.id}`)
        }

        if (game.state === GameState.Started) {
          navigate(`/game/${game.id}`)
        }
      })
      .catch((error) => {
        setErrorMessage('Could not find game with this code')
        setShowError(true)

        const timer = setTimeout(() => {
          setShowError(false)
        }, 3000)

        return () => clearTimeout(timer)
      })
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-5xl">History</h1>
          <Link to="/" className="font-medium text-xl hover:text-deep-blue">
            Go back to main menu
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {games?.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-screen font-bold text-5xl">
              <p>No games</p>
            </div>
          ) : (
            games?.map((game, index) => (
              <div
                key={index}
                className="flex flex-row justify-between border-2 border-sky-100 rounded-lg p-8 gap-24"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row w-full text-xl items-center">
                    <span className="pr-2 text-2xl">{game.player1}</span>
                    <span className="p-2">-</span>
                    <span className="p-2 text-2xl">{game.player2}</span>
                  </div>

                  <p>{game.date.toString()}</p>
                </div>

                <div className="flex items-center text-xl font-bold">
                  {(() => {
                    switch (game.status) {
                      case Status.Ongoing:
                        return (
                          <div className="flex flex-col items-end">
                            <p>Ongoing</p>
                            <button
                              onClick={() => handleJoinGame(game.gameId)}
                              className="text-xl hover:text-deep-blue"
                            >
                              Join
                            </button>
                          </div>
                        )
                      case Status.Winner:
                        return 'W'
                      case Status.Loser:
                        return 'L'
                    }
                  })()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}
