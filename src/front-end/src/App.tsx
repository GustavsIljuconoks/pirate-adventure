import LoadingOrError from '@components/LoadingOrError'
import { ProtectedRoute } from '@components/PrivateRoute'
import type { ReactElement } from 'react'
import { Suspense, lazy } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootState } from 'store'

const Main = lazy(async () => import('@pages/Start'))
const Leaderboard = lazy(async () => import('@pages/Leaderboard'))
const Settings = lazy(async () => import('@pages/LobbySettings'))
const LobbyCode = lazy(async () => import('@pages/LobbyCode'))
const Lobby = lazy(async () => import('@pages/Lobby'))
const Game = lazy(async () => import('@pages/Game'))
const JoinGame = lazy(async () => import('@pages/JoinGame'))
const GameOver = lazy(async () => import('@pages/GameOver'))
const Login = lazy(async () => import('@pages/Login'))

export default function App(): ReactElement {
  const isAuthenticated = useSelector((state: RootState) => state.userSave.name)

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <Routes>
          {/* Private routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Main />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/code" element={<LobbyCode />} />
            <Route path="/lobby/:guid" element={<Lobby />} />
            <Route path="/game/:guid" element={<Game />} />
            <Route path="/game-over/:guid" element={<GameOver />} />
          </Route>

          <Route path="/join/:guid" element={<JoinGame />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
