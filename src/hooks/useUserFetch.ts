import { useEffect, useState } from 'react'
import { IUser } from 'dtos/user'
import { userService } from 'services/user'
import useUserAuth from './useUserAuth'

const initialState: IUser = null

const useUserFetch = () => {
  const [authData] = useUserAuth()
  const [userInfo, setUserInfo] = useState<IUser>(initialState)

  const { userData } = authData
  useEffect(() => {
    if (!userInfo && userData) {
      const fetchData = { id: userData.id, token: authData.token }
      userService
        .fetchUser({ userData: fetchData, remember: true })
        .then((data: IUser) => {
          setUserInfo(data)
        })
    }
  }, [userData, authData, userInfo])

  return { userInfo }
}

export default useUserFetch
