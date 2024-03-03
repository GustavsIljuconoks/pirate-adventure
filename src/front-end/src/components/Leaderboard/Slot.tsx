import type { ReactElement } from 'react'
import type { Player } from 'types/Player'

interface Properties {
	player: Player
	ranking: number
}

export default function Slot({ player, ranking }: Properties): ReactElement {
	return (
		<div className="flex items-center justify-between text-2xl border-2 border-white rounded-lg py-2 px-4 text-white">
			<h1 data-testid="PlayerName">
				<span>#{ranking} </span>
				{player.username}
			</h1>
			<h1 data-testid="PlayerWins">{player.wins}</h1>
		</div>
	)
}
