import axios from 'axios'
import Layout from 'components/layout/Layout'
import type { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrentGame } from 'reducers/gameSlice'
import '../styles/Start.css'

export default function Main(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const createNewGame = (): void => {
    axios
      .post<{ id: string }>('https://localhost:7035/game/create', {
        player1: 'gustavs'
      })
      .then((response) => {
        const gameId = response.data.id
        dispatch(setCurrentGame({ player1: 'gustavs', id: gameId }))
        navigate(`/lobby/${gameId}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Layout>
      <div className="flex flex-col gap-12 mt-auto">
        <button type="submit" className="menu-item" onClick={createNewGame}>
          New game
        </button>

        <button type="submit" className="menu-item">
          Join
        </button>

        <button type="submit" className="menu-item">
          Tutorial
        </button>

        <button type="submit" className="menu-item">
          Leaderboard
        </button>
      </div>
    </Layout>
  )
}
