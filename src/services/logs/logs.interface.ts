import AxiosConfig from 'services/axiosConfig'

interface ILogsCreate {
  id?: number
  idAccount: number
  token: string
}
export interface ILogsCreateAxios extends AxiosConfig {
  logsData: ILogsCreate
  remember: boolean
}
