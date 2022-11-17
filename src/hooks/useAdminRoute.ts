import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useProtectedRoute from './useProtectedRoute'
import useUserAuth from './useUserAuth'

const useAdminRoute = () => {
  const navigate = useNavigate()
  const [userToken] = useUserAuth()
  useProtectedRoute()
  useEffect(() => {
    if (!userToken.isAdmin) {
      navigate('/dashboard')
    }
  }, [userToken, navigate])
}

export default useAdminRoute
