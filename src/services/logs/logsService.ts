import axios from 'axios'
import { ILogsCreateAxios } from './logs.interface'

export const logsService = Object.freeze({
  getLogsByAccount: (team) => getLogsByAccount(team),
})

const getLogsByAccount = async ({ logsData }: ILogsCreateAxios) => {
  try {
    const res = await axios.get(`/logs?accountId=${logsData.idAccount}`, {
      headers: { Authorization: `Bearer ${logsData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}
