import { IUserCreate, IUserFetch } from 'dtos/user'
import AxiosConfig from '../axiosConfig'

export interface IUserFetchAxios extends AxiosConfig {
  userData: IUserFetch
  remember: boolean
}
export interface IUserCreateAxios extends AxiosConfig {
  userData: IUserCreate
  remember: boolean
}
