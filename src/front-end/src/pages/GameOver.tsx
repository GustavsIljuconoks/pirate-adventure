import Layout from '@components/Layout/Layout'
import { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'store'
import { GameDto, PlayerState } from 'types/webapi'
import { useWhoAmI } from 'utils/whoAmI'

export default function GameOver(): ReactElement {
  const { whoAmI } = useWhoAmI()
  const gameData = useSelector((state: RootState) => state.gameStatusData.data)
  const gamePlayers = useSelector(
    (state: RootState) => state.updatePlayers.players
  )

  useEffect(() => {
    whoAmI()
  }, [])

  const findPlayerIdWithState = (gameData: GameDto, state: PlayerState) => {
    if (gameData.player1.state === state) {
      return gameData.player1.id
    } else if (gameData.player2.state === state) {
      return gameData.player2.id
    }
    return null
  }

  const winnerPlayerId = findPlayerIdWithState(gameData, PlayerState.Winner)
  const loserPlayerId = findPlayerIdWithState(gameData, PlayerState.Loser)

  const gameOverText =
    gamePlayers.me.name === winnerPlayerId
      ? 'Great job!'
      : 'Better luck next time!'

  return (
    <Layout>
      <div className="flex flex-col justify-center gap-20">
        <div className="info">
          <h1 className="font-bold text-4xl text-center">Game over!</h1>
          <h1 className="font-bold text-3xl text-center">{gameOverText}</h1>
        </div>

        <div className="flex flex-row justify-around mb-6">
          <div className="player flex flex-col justify-center items-center gap-6">
            <p className="name font-bold text-3xl">{gamePlayers.me.name}</p>

            <div className="icon">
              <img
                src="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/celebrity-captain-jack-sparrow-pirate-carribean-512.png"
                alt="avatar"
                width={200}
                height={200}
              />
            </div>

            <div className="game-result">
              <h2 className="text-4xl font-bold">
                {gamePlayers.me.name === winnerPlayerId
                  ? 'Winner!!!'
                  : 'Loser!!!'}
              </h2>
            </div>
          </div>

          <div className="player flex flex-col justify-center items-center gap-6">
            <p className="name font-bold text-3xl">{gamePlayers.enemy.name}</p>

            <div className="icon">
              <img
                src="https://img.freepik.com/premium-vector/head-pirate-with-hat-eye-patch-flat-vector-illustration_124715-1485.jpg"
                alt="avatar"
                width={200}
                height={200}
              />
            </div>

            <div className="game-result">
              <h2 className="text-4xl font-bold">
                {gamePlayers.enemy.name !== loserPlayerId
                  ? 'Winner!!!'
                  : 'Loser!!!'}
              </h2>
            </div>
          </div>
        </div>

        {gamePlayers.me.name === winnerPlayerId ? (
          <div className="flex items-center justify-center text-xl font-semibold">
            <img src="/icons/trophy-cup.png" alt="trophy cup" width={100} />
            <p>+2 cups</p>
          </div>
        ) : null}

        <Link to="/" className="text-3xl font-medium text-center">
          Back to start
        </Link>
      </div>
    </Layout>
  )
}
