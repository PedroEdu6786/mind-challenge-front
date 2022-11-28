import AxiosConfig from 'services/axiosConfig'

interface ITeamCreate {
  id?: number
  token: string
  accountId?: number
}
export interface ITeamCreateAxios extends AxiosConfig {
  teamData: ITeamCreate
  remember: boolean
}
