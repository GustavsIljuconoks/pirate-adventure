import { useState, type ReactElement } from 'react'

import LobbyAvatar from 'components/LobbyAvatar'
import SettingsMenu from 'components/SettingsMenu'
import CopyToClipboard from 'components/input/CopyToClipboard'
import Layout from 'components/layout/Layout'

import GameBoard from 'components/field/Board'
import style from 'styles/lobby/Lobby.module.css'

import { APP_URL } from 'constants'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

export default function Lobby(): ReactElement {
  const [playerReady, setPlayerReady] = useState(false)
  const apiData = useSelector((state: RootState) => state.apiData.data)
  const joinGameLink = APP_URL + 'join/' + apiData.id

  const handlePlayerReady = () => {
    setPlayerReady((prevPlayerReady) => !prevPlayerReady)
  }

  const gamePlayer1 = useSelector((state: RootState) => state.game.player1)
  const gamePlayer2 = useSelector((state: RootState) => state.game.player2)

  return (
    <Layout>
      <div className="mx-auto">
        <div className={style['lobby-code']}>
          <CopyToClipboard joinLink={joinGameLink} />
          <SettingsMenu />
        </div>

        <div className="setup mb-16">
          <h1 className="text-3xl font-bold text-center mb-10">Your Fleet</h1>

          <div className="flex flex-row mb-8 gap-4">
            <GameBoard />
            <div className={style.instructions}>
              <div className={style.instruction}>
                <p>Drag to move</p>
                <img src="/icons/drag.svg" alt="touch" width={50} height={50} />
              </div>

              <div className={style.instruction}>
                <p>Tap to rotate</p>
                <img
                  src="/icons/touch.svg"
                  alt="touch"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="bg-deep-blue w-9/12 p-4 rounded-lg font-medium align-middle"
              onClick={handlePlayerReady}
            >
              Ready to fight
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <LobbyAvatar
            username={gamePlayer1?.player1}
            isReady={playerReady}
            avatarIcon="https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-03/64/celebrity-captain-jack-sparrow-pirate-carribean-512.png"
          />
          <LobbyAvatar
            username={gamePlayer2?.player2}
            isReady={playerReady}
            avatarIcon="https://img.freepik.com/premium-vector/head-pirate-with-hat-eye-patch-flat-vector-illustration_124715-1485.jpg"
          />
        </div>
      </div>
    </Layout>
  )
}
