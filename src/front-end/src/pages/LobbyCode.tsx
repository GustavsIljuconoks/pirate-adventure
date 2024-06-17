import Layout from '@components/Layout/Layout'
import { Toast } from '@components/Toast'
import TextField from '@components/input/TextField'
import axios from 'axios'
import { useState, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setApiData, setGameState } from 'reducers/apiDataSlice'
import { setPlayer1, setPlayer2 } from 'reducers/gameSlice'
import { RootState } from 'store'
import { GameDto, GameState } from 'types/webapi'
import { findLinkByRel } from 'utils/findLinkByRel'
import { replaceGameId } from 'utils/replaceGameId'
import { SERVER_URL } from '../constants'

export default function LobbyCode(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [code, setCode] = useState('')

  const apiData = useSelector((state: RootState) => state.apiData.data)
  const gameLink = useSelector((state: RootState) => state.apiData.link)
  const userName = useSelector((state: RootState) => state.userSave.name)

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setCode('')

    const resumeGameLink = findLinkByRel(apiData, 'resumeGame')
    const resumeLink = replaceGameId(resumeGameLink, code)

    axios
      .post(SERVER_URL + resumeLink)
      .then((response) => {
        const game: GameDto = response.data
        const gameStatusLink = replaceGameId(gameLink, game.id)

        dispatch(setGameState(gameStatusLink))
        dispatch(setApiData(response.data))

        if (userName === game.player1.id) {
          dispatch(setPlayer1({ player1: userName, id: game.id }))
        }

        if (userName === game.player2.id) {
          dispatch(setPlayer2({ player2: userName, id: game.id }))
        }

        if (game.state === GameState.Lobby) {
          navigate(`/lobby/${game.id}`)
        }

        if (game.state === GameState.Started) {
          navigate(`/game/${game.id}`)
        }
      })
      .catch((error) => {
        setErrorMessage('Could not find game with this code')
        setShowError(true)

        const timer = setTimeout(() => {
          setShowError(false)
        }, 3000)

        return () => clearTimeout(timer)
      })
  }

  return (
    <Layout>
      <div className="flex flex-col my-auto">
        <Toast show={showError} type="danger" message={errorMessage} />

        <div className="font-bold text-center mb-12">
          <h1 className="text-2xl mb-4">Classical battle ship game</h1>
          <h1 className="text-5xl">Pirate’s adventure</h1>
        </div>

        <form
          method="post"
          onSubmit={onSubmitForm}
          className="flex flex-row gap-4 justify-center"
        >
          <TextField
            type="text"
            placeholder="Enter lobby code"
            value={code}
            onChange={(event): void => setCode(event.target.value)}
          />

          <button
            type="submit"
            className="font-medium text-xl hover:text-deep-blue"
          >
            Join
          </button>
        </form>
      </div>
    </Layout>
  )
}
