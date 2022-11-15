import { IAuthLogin } from '../../dtos/user'
import AxiosConfig from '../axiosConfig'

export interface IAuthLoginAxios extends AxiosConfig {
  authFormData: IAuthLogin
  remember: boolean
}
