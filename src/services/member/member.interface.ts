import AxiosConfig from 'services/axiosConfig'

interface IMemberCreate {
  id?: number
  idUser: number
  idTeam: number
  token: string
}
export interface IMemberCreateAxios extends AxiosConfig {
  memberData: IMemberCreate
  remember: boolean
}
