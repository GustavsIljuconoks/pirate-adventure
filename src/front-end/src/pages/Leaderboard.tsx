import Layout from 'components/Layout/Layout'
import Slot from 'components/Leaderboard/Slot'
import players from 'mocks/players.json'
import type { ReactElement } from 'react'

export default function Leaderboard(): ReactElement {
	return (
		<Layout>
			<div className="my-auto">
				<div className="leaderbord mb-10">
					<div className="flex flex-row justify-between text-white mb-8 font-bold text-5xl">
						<p>Player</p>
						<p>Wins</p>
					</div>

					<div className="flex flex-col gap-4">
						{players.map((player, index) => (
							<Slot
								key={`player-${player.username}`}
								player={player}
								ranking={index + 1}
							/>
						))}
					</div>
				</div>

				<a href="/" className="text-white font-medium text-xl">
					Go back to main menu
				</a>
			</div>
		</Layout>
	)
}
