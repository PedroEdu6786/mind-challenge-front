import axios from 'axios'
import { IAuthLoginAxios } from './auth.interfaces'

const authService = Object.freeze({
  signInUser: (authData: IAuthLoginAxios) => signInUser(authData),
})

const signInUser = async ({ authFormData, config }: IAuthLoginAxios) => {
  try {
    const res = await axios.post('/auth/login', authFormData, config)
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

export default authService
