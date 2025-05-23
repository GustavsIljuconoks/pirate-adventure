import Layout from '@components/Layout/Layout'
import '@styles/Start.css'
import axios from 'axios'
import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setApiData, setGameState } from 'reducers/apiDataSlice'
import { setPlayer1 } from 'reducers/gameSlice'
import { setAuth } from 'reducers/userSlice'
import { persistor, RootState } from 'store'
import { findLinkByRel } from 'utils/findLinkByRel'
import { replaceGameId } from 'utils/replaceGameId'
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
    dispatch({ type: 'CLEAR' })
    persistor.purge()
  }, [])

  const apiData = useSelector((state: RootState) => state.apiData.data)
  const gameLink = useSelector((state: RootState) => state.apiData.link)
  const userName = useSelector((state: RootState) => state.userSave.name)

  const createNewGame = (): void => {
    const createGameLink = findLinkByRel(apiData, 'createGame')

    axios
      .post(SERVER_URL + createGameLink, {
        player1: userName
      })
      .then((response) => {
        dispatch(setApiData(response.data))
        const gameStatusLink = replaceGameId(gameLink, response.data.id)
        dispatch(setGameState(gameStatusLink))

        const gameId = response.data.id
        dispatch(setPlayer1({ player1: userName, id: gameId }))
        navigate(`/lobby/${gameId}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const signOut = (): void => {
    dispatch(setAuth({ name: '', isAuthenticated: false }))
    navigate('/login')
  }

  return (
    <Layout>
      <div className="player-info md:absolute md:right-20 md:top-16 lg:mt-6">
        <p>{userName}</p>
        <button className="text-end" onClick={signOut}>
          Sign out
        </button>
      </div>
      <div className="flex flex-col gap-12 mt-auto">
        <button type="submit" className="menu-item" onClick={createNewGame}>
          New game
        </button>

        <Link to="code" className="menu-item">
          Join
        </Link>

        <Link to="history" className="menu-item">
          History
        </Link>

        <Link to="leaderboard" className="menu-item">
          Leaderboard
        </Link>
      </div>
    </Layout>
  )
}
