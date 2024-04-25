import LoadingOrError from '@components/LoadingOrError'
import axios from 'axios'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setApiData, setGameState } from 'reducers/apiDataSlice'
import { setPlayer2 } from 'reducers/gameSlice'
import { persistor, RootState } from 'store'
import { findLinkByRel } from 'utils/findLinkByRel'
import { replaceGameId } from 'utils/replaceGameId'
import { SERVER_URL } from '../constants'

export default function JoinGame(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const userName = useSelector((state: RootState) => state.userSave.name)

  useEffect(() => {
    dispatch({ type: 'CLEAR' })
    persistor.purge()

    const intendedDestinationUrl = localStorage.getItem(
      'intendedDestinationUrl'
    )

    if (!intendedDestinationUrl) {
      localStorage.setItem('intendedDestinationUrl', window.location.href)
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(SERVER_URL)
        const statusLink = findLinkByRel(response.data, 'getGame')
        const joinGameLinkTemplate = findLinkByRel(response.data, 'joinGame')

        if (joinGameLinkTemplate) {
          const url = window.location.href
          const gameId = url.split('/join/')[1]
          const joinLink = replaceGameId(joinGameLinkTemplate, gameId)
          const gameStatusLink = replaceGameId(statusLink, gameId)

          axios
            .post(SERVER_URL + joinLink, { player2: userName })
            .then((response) => {
              dispatch(setApiData(response.data))
              dispatch(setPlayer2({ player2: userName, id: gameId }))
              dispatch(setGameState(gameStatusLink))
              navigate(`/lobby/${gameId}`)
            })
            .catch((error) => {
              setLoading(false)
            })
        }
      } catch (error) {
        setLoading(false)
        return <LoadingOrError error={error} />
      }
    }

    if (userName) {
      fetchData()
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate])

  if (loading) {
    return <LoadingOrError />
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-xl">Your are not eligible to join!</h1>
    </div>
  )
}
