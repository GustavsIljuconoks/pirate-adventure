import Layout from '@components/Layout/Layout'
import '@styles/Start.css'
import axios from 'axios'
import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setApiData, setGameState } from 'reducers/apiDataSlice'
import { setPlayer1 } from 'reducers/gameSlice'
import { RootState } from 'store'
import { findLinkByRel } from 'utils/findLinkByRel'
import { SERVER_URL } from '../constants'

export default function Start(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getRoot = (): void => {
    axios
      .get(SERVER_URL)
      .then((response) => {
        const gameStatusLink = findLinkByRel(response.data, 'getGame')
        dispatch(setApiData(response.data))
        dispatch(setGameState(gameStatusLink))
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  }

  useEffect(() => {
    getRoot()
  }, [])

  const apiData = useSelector((state: RootState) => state.apiData.data)

  const createNewGame = (): void => {
    const createGameLink = findLinkByRel(apiData, 'createGame')

    axios
      .post(SERVER_URL + createGameLink, {
        player1: 'gustavs'
      })
      .then((response) => {
        const responseItems = response.data
        dispatch(setApiData(responseItems))

        const gameId = response.data.id
        dispatch(setPlayer1({ player1: 'gustavs', id: gameId }))
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
