import style from '@styles/SettingsMenu.module.css'
import classNames from 'classnames'
import { useEffect, useRef, useState, type ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { setMusic } from 'reducers/soundSaveSlice'
import lobbyMusic from '../../public/sounds/lobby-music.mp3?url'

export default function SettingsMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const musicRef = useRef(new Audio(lobbyMusic))
  const dispatch = useDispatch()

  useEffect(() => {
    musicRef.current.volume = 0.1
    playSound()

    return () => {
      pauseSound()
    }
  }, [])

  const playSound = () => {
    musicRef.current.play()
    dispatch(setMusic({ music: true }))
  }

  const pauseSound = () => {
    musicRef.current.pause()
    dispatch(setMusic({ music: false }))
  }

  const handleMusic = () => {
    setIsPlaying((prevIsPlaying) => {
      if (prevIsPlaying) {
        pauseSound()
      } else {
        playSound()
      }
      return !prevIsPlaying
    })
  }

  return (
    <div className={style.settings}>
      <div className={style['menu-header']}>
        <div className={style['menu-item']}>
          <button
            type="button"
            onClick={(): void => setIsOpen(!isOpen)}
            className="align-middle"
          >
            <img src="/icons/settings.svg" alt="settings" />
          </button>
        </div>
      </div>

      <div
        className={`${style.dropdown} ${
          isOpen ? `${style.open}` : `${style.closed}`
        }`}
      >
        <div className={style['menu-item']}>
          <button type="button">
            <img src="/icons/sound.svg" alt="sound" />
          </button>
        </div>

        <div
          className={classNames(
            'relative grid place-content-center',
            style['menu-item']
          )}
        >
          <button type="button" onClick={handleMusic}>
            <div
              className={classNames(style['cross'], {
                [style.off]: !isPlaying
              })}
            ></div>
            <img src="/icons/music.svg" alt="music" />
          </button>
        </div>
      </div>
    </div>
  )
}
