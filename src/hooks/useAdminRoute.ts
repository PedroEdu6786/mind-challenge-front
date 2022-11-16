import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useProtectedRoute from './useProtectedRoute'
import useUserAuth from './useUserAuth'

const useAdminRoute = () => {
  useProtectedRoute()
  const navigate = useNavigate()
  const [userToken] = useUserAuth()
  useEffect(() => {
    if (!userToken.isAdmin) {
      navigate('/dashboard')
    }
  }, [userToken, navigate])
}

export default useAdminRoute
