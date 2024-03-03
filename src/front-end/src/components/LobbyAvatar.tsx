import type { ReactElement } from 'react'
import style from 'styles/lobby/LobbyAvatar.module.css'

interface LobbyProperties {
	username: string
	isReady: boolean
	avatarIcon: string
}

export default function LobbyAvatar({
	username,
	isReady,
	avatarIcon
}: LobbyProperties): ReactElement {
	return (
		<div className={style.avatar}>
			<div className="avatar-username">{username}</div>

			<div className="icon">
				<img src={avatarIcon} alt="" width={100} height={100} />
			</div>

			{isReady ? <p className={style.ready}>Ready!</p> : undefined}
		</div>
	)
}
