import LoadingOrError from 'components/LoadingOrError'
import type { ReactElement } from 'react'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Main = lazy(async () => import('pages/Start'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path="/" element={<Main />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
