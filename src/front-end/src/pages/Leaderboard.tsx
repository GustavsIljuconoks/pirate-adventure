import Layout from '@components/Layout/Layout'
import Slot from '@components/Leaderboard/Slot'
import axios from 'axios'
import { useEffect, useState, type ReactElement } from 'react'
import { LeaderboardResponseDto } from 'types/webapi'
import { SERVER_URL } from '../constants'

export default function Leaderboard(): ReactElement {
  const [players, setPlayers] = useState<LeaderboardResponseDto[]>()

  useEffect(() => {
    axios
      .get(SERVER_URL + '/leaderboard')
      .then((response) => {
        setPlayers(response.data)
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  }, [players])

  return (
    <Layout>
      <div className="my-auto">
        <div className="leaderbord mb-10">
          <div className="flex flex-row justify-between mb-8 font-bold text-5xl items-center">
            <p>Player</p>
            <p>Cups</p>
          </div>

          <div className="flex flex-col gap-4">
            {players &&
              players.map((player, index) => (
                <Slot
                  key={`player-${player.name}`}
                  player={player}
                  ranking={index + 1}
                />
              ))}
          </div>
        </div>

        <a href="/" className="font-medium text-xl hover:text-deep-blue">
          Go back to main menu
        </a>
      </div>
    </Layout>
  )
}
