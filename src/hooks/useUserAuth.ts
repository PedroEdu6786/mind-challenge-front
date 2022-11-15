import useLocalStorage from './useLocalStorage'

interface IUseUserAuth {
  authToken: string | undefined
  isAdmin: boolean
}

function useUserAuth(): [IUseUserAuth, (data: IUseUserAuth) => void] {
  const [authToken, setAuthToken] = useLocalStorage('auth', undefined)
  const [isAdmin, setIsAdmin] = useLocalStorage('isAdmin', false)

  const setUserToken = ({ authToken, isAdmin }: IUseUserAuth) => {
    setAuthToken(authToken)
    setIsAdmin(isAdmin)
  }

  return [{ authToken, isAdmin }, setUserToken]
}

export default useUserAuth
