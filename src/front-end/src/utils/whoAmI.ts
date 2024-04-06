import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { getGameStatus } from './gameStatusRequest'

type GamePlayerState = {
  me: string
  enemy: string
}

export const useWhoAmI = () => {
  const gameStateLink = useSelector((state: RootState) => state.apiData.link)
  const gamePlayer1 = useSelector((state: RootState) => state.game.player1)
  const gamePlayer2 = useSelector((state: RootState) => state.game.player2)

  let players: GamePlayerState = {
    me: '',
    enemy: ''
  }

  const whoAmI = (updatePlayers: (players: any) => void) => {
    getGameStatus(gameStateLink)
      .then((data) => {
        if (gamePlayer1?.player1 == data.player1.id) {
          players = { me: gamePlayer1.player1, enemy: data.player2.id }
        }

        if (gamePlayer2?.player2 == data.player2.id) {
          players = { me: gamePlayer2.player2, enemy: data.player1.id }
        }

        updatePlayers(players)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  return { whoAmI }
}
