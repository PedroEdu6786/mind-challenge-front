import useLocalStorage from './useLocalStorage'

interface IUserLogin {
  id: number
  email: string
}
interface IUseUserAuth {
  token: string | undefined
  isAdmin: boolean
  userData: IUserLogin
}

function useUserAuth(): [
  IUseUserAuth,
  (data: IUseUserAuth) => void,
  () => void
] {
  const [token, setToken, removeToken] = useLocalStorage('auth', undefined)
  const [isAdmin, setIsAdmin, removeAdmin] = useLocalStorage('isAdmin', false)
  const [userData, setUserData, removeUserData] = useLocalStorage(
    'userData',
    undefined
  )

  const setUserToken = ({ token, isAdmin, userData }: IUseUserAuth) => {
    setToken(token)
    setIsAdmin(isAdmin)
    setUserData(userData)
  }

  const logout = () => {
    removeAdmin()
    removeToken()
    removeUserData()
    setIsAdmin(false)
    setToken(null)
    setUserData(null)
  }

  return [{ token, isAdmin, userData }, setUserToken, logout]
}

export default useUserAuth
