import AxiosConfig from 'services/axiosConfig'

interface ITeamCreate {
  id?: number
  token: string
  idAccount?: number
}
export interface ITeamCreateAxios extends AxiosConfig {
  teamData: ITeamCreate
  remember: boolean
}
