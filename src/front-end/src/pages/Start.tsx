/* eslint-disable react/jsx-no-duplicate-props */
import Layout from 'components/Layout/Layout'
import type { ReactElement } from 'react'
import '../styles/Start.css'

export default function Main(): ReactElement {
	return (
		<Layout>
			<div className="flex flex-col gap-12 mt-auto">
				<a
					href="https://unsplash.com"
					target="_blank"
					rel="noreferrer noopener"
					className="menu-item">
					New game
				</a>

				<a
					href="https://unsplash.com"
					target="_blank"
					rel="noreferrer noopener"
					className="menu-item">
					Join
				</a>

				<a
					href="https://unsplash.com"
					target="_blank"
					rel="noreferrer noopener"
					className="menu-item">
					Tutorial
				</a>

				<a
					href="/leaderboard"
					target="_blank"
					rel="noreferrer noopener"
					className="menu-item">
					Leaderboard
				</a>
			</div>
		</Layout>
	)
}
