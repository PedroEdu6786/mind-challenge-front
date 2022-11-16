import axios from 'axios'
import { IUserFetchAxios } from 'services/user/user.interfaces'

export const accountService = Object.freeze({
  fetchAccounts: (accountsData: IUserFetchAxios) => fetchAccounts(accountsData),
})

const fetchAccounts = async ({ userData, config }: IUserFetchAxios) => {
  try {
    const res = await axios.get(`/accounts`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}
