import Layout from '@components/Layout/Layout'
import axios from 'axios'
import { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'store'
import { PlayerGamesResponseDto, Status } from 'types/webapi'
import { SERVER_URL } from '../constants'

export default function History(): ReactElement {
  const player = useSelector((state: RootState) => state.userSave.name)
  const [games, setGames] = useState<PlayerGamesResponseDto[]>()

  useEffect(() => {
    axios
      .get(SERVER_URL + '/history', {
        params: {
          playerName: player
        }
      })
      .then((response) => {
        setGames(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  }, [])

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-5xl">History</h1>
          <Link to="/" className="font-medium text-xl hover:text-deep-blue">
            Go back to main menu
          </Link>
        </div>

        {games &&
          games.map((game, _index) => (
            <div className="flex flex-row justify-between border-2 border-sky-100 rounded-lg p-8">
              <div className="flex flex-col">
                <h2>
                  Game "<span>{game.gameId}</span>"
                </h2>

                <div className="flex flex-row justify-between">
                  <p>Player 1: {game.player1}</p>
                  <p>Player 2: {game.player2}</p>
                </div>
              </div>

              <p className="flex items-center text-xl font-bold">
                {(() => {
                  switch (game.status) {
                    case Status.Ongoing:
                      return 'Ongoing'
                    case Status.Winner:
                      return 'W'
                    case Status.Loser:
                      return 'L'
                  }
                })()}
              </p>
            </div>
          ))}
      </div>
    </Layout>
  )
}
