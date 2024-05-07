import { Navigate, Outlet } from 'react-router-dom'

type TProps = {
  isAuthenticated?: boolean
  redirectPath?: string
}

export const ProtectedRoute: React.FC<TProps> = ({
  isAuthenticated,
  redirectPath = '/login'
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />
}
