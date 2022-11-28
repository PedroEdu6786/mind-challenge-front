import axios from 'axios'
import { IUserFetchAxios } from 'services/user/user.interfaces'
import { IAccountFetchAxios } from './account.interfaces'

export const accountService = Object.freeze({
  fetchAccounts: (accountsData: IUserFetchAxios) => fetchAccounts(accountsData),
  createAccount: (accountsData: IAccountFetchAxios) =>
    createAccount(accountsData),
  updateAccount: (accountsData: IAccountFetchAxios) =>
    updateAccount(accountsData),
  deleteAccount: (accountsData: IUserFetchAxios) => deleteAccount(accountsData),
})

const updateAccount = async ({ accountData, config }: IAccountFetchAxios) => {
  try {
    const { accountName, clientName, headOfOperation } = accountData
    const payload = { accountName, clientName, headOfOperation }

    const res = await axios.put(`/accounts/${accountData.id}`, payload, {
      headers: { Authorization: `Bearer ${accountData.token}` },
      ...config,
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

const createAccount = async ({ accountData, config }: IAccountFetchAxios) => {
  try {
    const { accountName, clientName, headOfOperation } = accountData
    const payload = { accountName, clientName, headOfOperation }

    const res = await axios.post(`/accounts`, payload, {
      headers: { Authorization: `Bearer ${accountData.token}` },
      ...config,
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

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

const deleteAccount = async ({ userData, config }: IUserFetchAxios) => {
  try {
    const res = await axios.delete(`/accounts/${userData.id}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}
