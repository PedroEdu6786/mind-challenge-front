import { IAccountFetch } from 'dtos/account'
import AxiosConfig from '../axiosConfig'

export interface IAccountFetchAxios extends AxiosConfig {
  accountData: IAccountFetch
  remember: boolean
}
