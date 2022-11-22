import axios from 'axios'
import { ITeamCreateAxios } from './team.interfaces'

export const teamService = Object.freeze({
  fetchAllTeams: (team: ITeamCreateAxios) => fetchAllTeams(team),
  createTeam: (team: ITeamCreateAxios) => createTeam(team),
})

const createTeam = async ({ teamData, config }: ITeamCreateAxios) => {
  try {
    const { idAccount } = teamData
    const payload = { idAccount }
    const res = await axios.post(`/teams`, payload, {
      headers: { Authorization: `Bearer ${teamData.token}` },
      ...config,
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

const fetchAllTeams = async ({ teamData }: ITeamCreateAxios) => {
  try {
    const res = await axios.get(`/teams?accountId=${teamData.idAccount}`, {
      headers: { Authorization: `Bearer ${teamData.token}` },
    })
    const { data } = await res

    console.log(data)
    return data
  } catch (err) {
    throw new Error()
  }
}
