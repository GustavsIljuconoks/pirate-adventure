import { useDispatch, useSelector } from 'react-redux'
import { setPlayers } from 'reducers/gamePlayersSlice'
import { RootState } from 'store'
import { GamePlayers } from 'types/Player'
import { getGameStatus } from './gameStatusRequest'

export const useWhoAmI = () => {
  const gameStateLink = useSelector((state: RootState) => state.apiData.link)
  const gamePlayer1 = useSelector((state: RootState) => state.game.player1)
  const gamePlayer2 = useSelector((state: RootState) => state.game.player2)
  const dispatch = useDispatch()

  let players = <GamePlayers>{}

  const whoAmI = () => {
    getGameStatus(gameStateLink)
      .then((data) => {
        if (gamePlayer1?.player1 == data.player1.id) {
          players = {
            me: {
              id: 1,
              name: gamePlayer1.player1,
              field: data.player1.field
            },
            enemy: {
              id: 2,
              name: data.player2.id,
              field: data.player2.field
            }
          }
        }

        if (gamePlayer2?.player2 == data.player2.id) {
          players = {
            me: {
              id: 2,
              name: gamePlayer2.player2,
              field: data.player2.field
            },
            enemy: {
              id: 1,
              name: data.player1.id,
              field: data.player1.field
            }
          }
        }

        dispatch(setPlayers(players))
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  return { whoAmI }
}
