import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useToast from './useToast'
import useUserAuth from './useUserAuth'

const useProtectedRoute = () => {
  const navigate = useNavigate()
  const [userToken] = useUserAuth()
  const { callAlertToast } = useToast()

  useEffect(() => {
    if (!userToken.token) {
      navigate('/auth/login')
      callAlertToast('Login to access page')
    }
  }, [userToken, callAlertToast, navigate])
}

export default useProtectedRoute
