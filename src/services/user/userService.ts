import axios from 'axios'
import { IUserCreateAxios, IUserFetchAxios } from './user.interfaces'

export const userService = Object.freeze({
  fetchUser: (authData: IUserFetchAxios) => fetchUser(authData),
  fetchAllUsers: (users: IUserFetchAxios) => fetchAllUsers(users),
  createUser: (userData: IUserCreateAxios) => createUser(userData),
  updateUser: (userData: IUserCreateAxios) => updateUser(userData),
})

const createUser = async ({ userData, config }: IUserCreateAxios) => {
  try {
    const { name, email, englishLevel, cvLink, isAdmin, skills } = userData
    const payload = {
      name,
      password: 'qwerty',
      email,
      englishLevel,
      cvLink,
      isAdmin,
      skills,
    }

    const res = await axios.post(`/users`, payload, {
      headers: { Authorization: `Bearer ${userData.token}` },
      ...config,
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

const updateUser = async ({ userData, config }: IUserCreateAxios) => {
  try {
    const { name, email, englishLevel, cvLink, isAdmin, skills } = userData
    const payload = {
      name,
      email,
      englishLevel,
      cvLink,
      isAdmin,
      skills,
    }

    const res = await axios.put(`/users/${userData.id}`, payload, {
      headers: { Authorization: `Bearer ${userData.token}` },
      ...config,
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

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

const fetchAllUsers = async ({ userData }: IUserFetchAxios) => {
  try {
    const res = await axios.get(`/users`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    const { data } = await res

    console.log(data)
    return data
  } catch (err) {
    throw new Error()
  }
}
