import AxiosConfig from 'services/axiosConfig'

interface IMemberCreate {
  id?: number
  idUser: number
  idTeam?: number | null
  token: string
}
export interface IMemberCreateAxios extends AxiosConfig {
  memberData: IMemberCreate
  remember: boolean
}
