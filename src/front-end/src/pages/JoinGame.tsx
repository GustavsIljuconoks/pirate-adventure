import LoadingOrError from '@components/LoadingOrError'
import axios from 'axios'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setApiData, setGameState } from 'reducers/apiDataSlice'
import { setPlayer2 } from 'reducers/gameSlice'
import { findLinkByRel } from 'utils/findLinkByRel'
import { replaceGameId } from 'utils/replaceGameId'
import { SERVER_URL } from '../constants'

export default function JoinGame(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SERVER_URL)
        const gameStatusLink = findLinkByRel(response.data, 'getGame')
        const joinGameLinkTemplate = findLinkByRel(response.data, 'joinGame')

        if (joinGameLinkTemplate) {
          const url = window.location.href
          const gameId = url.split('/join/')[1]
          const joinLink = replaceGameId(joinGameLinkTemplate, gameId)

          axios
            .post(SERVER_URL + joinLink, { player2: 'valdis' })
            .then((response) => {
              dispatch(setApiData(response.data))
              dispatch(setPlayer2({ player2: 'valdis', id: gameId }))
              dispatch(setGameState(gameStatusLink))
              navigate(`/lobby/${gameId}`)
            })
        }
      } catch (error) {
        return <LoadingOrError error={error} />
      }
    }

    fetchData()
  }, [dispatch, navigate])

  if (loading) {
    return <LoadingOrError />
  }

  return <div>Your are not eligible to join!</div>
}
