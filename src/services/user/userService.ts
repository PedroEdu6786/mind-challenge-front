import axios from 'axios'
import { IUserFetchAxios } from './user.interfaces'

export const userService = Object.freeze({
  fetchUser: (authData: IUserFetchAxios) => fetchUser(authData),
})

const fetchUser = async ({ userData, config }: IUserFetchAxios) => {
  try {
    const res = await axios.get(`/users/${userData.id}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}
