import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Main = lazy(async () => import('pages/Start'))
const Leaderboard = lazy(async () => import('pages/Leaderboard'))
const Settings = lazy(async () => import('pages/LobbySettings'))
const LobbyCode = lazy(async () => import('pages/LobbyCode'))
const Lobby = lazy(async () => import('pages/Lobby'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/code" element={<LobbyCode />} />
					<Route path="/lobby" element={<Lobby />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
