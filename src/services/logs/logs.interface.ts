import AxiosConfig from 'services/axiosConfig'

interface ILogsCreate {
  id?: number
  accountId: number
  token: string
}
export interface ILogsCreateAxios extends AxiosConfig {
  logsData: ILogsCreate
  remember: boolean
}
