import axios from 'axios'
import Layout from 'components/layout/Layout'
import type { ReactElement } from 'react'
import '../styles/Start.css'

export default function Main(): ReactElement {
  const createNewGame = () => {
    axios
      .post('https://localhost:7035/game/create', {
        player1: 'gustavs'
      })
      .then((response) => {
        console.log(response.data)
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
