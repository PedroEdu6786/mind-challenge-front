import useLocalStorage from './useLocalStorage'

interface IUseUserAuth {
  authToken: string | undefined
  isAdmin: boolean
}

function useUserAuth(): [
  IUseUserAuth,
  (data: IUseUserAuth) => void,
  () => void
] {
  const [authToken, setAuthToken, removeToken] = useLocalStorage(
    'auth',
    undefined
  )
  const [isAdmin, setIsAdmin, removeAdmin] = useLocalStorage('isAdmin', false)

  const setUserToken = ({ authToken, isAdmin }: IUseUserAuth) => {
    setAuthToken(authToken)
    setIsAdmin(isAdmin)
  }

  const logout = () => {
    removeAdmin()
    removeToken()
    setIsAdmin(false)
    setAuthToken(null)
  }

  return [{ authToken, isAdmin }, setUserToken, logout]
}

export default useUserAuth
