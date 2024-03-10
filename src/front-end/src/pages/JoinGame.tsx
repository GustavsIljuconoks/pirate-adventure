import axios from 'axios'
import LoadingOrError from 'components/LoadingOrError'
import { SERVER_URL } from 'constants'
import { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setApiData } from 'reducers/apiDataSlice'
import { setPlayer2 } from 'reducers/gameSlice'

export default function JoinGame(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [apiResponse, setApiResponse] = useState(null)
  const [joinGameLink, setJoinGameLink] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SERVER_URL)
        setApiResponse(response.data)
        dispatch(setApiData(response.data))
        setLoading(false)

        const joinGameLinkTemplate = response.data._links.find(
          (link) => link.rel === 'joinGame'
        )?.href

        if (joinGameLinkTemplate) {
          const url = window.location.href
          const gameId = url.split('/join/')[1]
          const joinLink = joinGameLinkTemplate.replace(
            '00000000-0000-0000-0000-000000000000',
            gameId
          )
          setJoinGameLink(joinLink)
          console.log(joinLink)

          axios
            .post(SERVER_URL + joinLink, { player2: 'valdis' })
              .then(() => {
                dispatch(setPlayer2({ player2: 'valdis', id: gameId }))
                navigate(`/lobby/${gameId}`)
            })
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch, navigate])

  if (loading) {
    return <LoadingOrError />
  }

  if (!joinGameLink) {
    return <div>Failed to find joinGame link.</div>
  }

  return <div>Game Joined!</div>
}
