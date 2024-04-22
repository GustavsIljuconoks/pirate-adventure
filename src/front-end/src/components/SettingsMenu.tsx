import style from '@styles/SettingsMenu.module.css'
import { useState, type ReactElement } from 'react'

export default function SettingsMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState(false)

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

        <div className={style['menu-item']}>
          <button type="button">
            <img src="/icons/music.svg" alt="music" />
          </button>
        </div>
      </div>
    </div>
  )
}
